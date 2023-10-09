import { Pinecone, PineconeRecord, Vector } from '@pinecone-database/pinecone';
import { downloadFromS3 } from './s3-server';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import {
	Document,
	RecursiveCharacterTextSplitter,
} from '@pinecone-database/doc-splitter';
import { getEmbeddings } from './embeddings';
import md5 from 'md5';
import { convertToAscii } from './utils';

// let pinecone: Pinecone | null = null;

export const getPinecone = () => {
	return new Pinecone({
		environment: process.env.PINECONE_ENVIRONMENT!,
		apiKey: process.env.PINECONE_API_KEY!,
	});
};

type PDFPage = {
	pageContent: string;
	metadata: {
		loc: { pageNumber: number };
	};
};

export async function loadS3IntoPinecone(file_key: string) {
	// 1 - Obtain PDF from S3, download it to local disk and load it into PDFLoader
	console.log('1 - Obtain PDF from S3');
	const file_name = await downloadFromS3(file_key);
	if (!file_name) {
		throw new Error('Could not download file from S3');
	}

	console.log('putting pdf into loader ' + file_name);
	const loader = new PDFLoader(file_name);
	const pages = (await loader.load()) as PDFPage[];

	// 2 - Load PDF into Pinecone split and segment pdf into smaller chunks
	// takes a single page and split it into smaller chunks
	const documents = await Promise.all(pages.map(prepareDocument));

	// 3. vectorise and embed individual documents
	const vectors = await Promise.all(documents.flat().map(embedDocument));

	// 4. load vectors into pinecone
	const client = await getPinecone();
	const pineconeIndex = await client.index('chat-pdf');
	const namespace = pineconeIndex.namespace(convertToAscii(file_key));
	console.log('loading vectors into pinecone');

	await namespace.upsert(
		vectors.filter(
			(vector): vector is PineconeRecord => vector !== undefined
		)
	);
	return documents[0];
}

// function to vectorise and embed individual documents
async function embedDocument(documents: Document) {
	try {
		// convert page content into embeddings (vectors)
		const embeddings = await getEmbeddings(documents.pageContent);
		const hash = md5(documents.pageContent);

		// return vector
		return {
			id: hash,
			values: embeddings,
			metadata: {
				pageNumber: documents.metadata.pageNumber,
				text: documents.metadata.text,
			},
		} as PineconeRecord;
	} catch (error) {
		console.log(error);
	}
}

// utils functions to split docs into smaller chunks
export const truncateStringByBytes = (str: string, bytes: number) => {
	const enc = new TextEncoder();
	return new TextDecoder('utf-8').decode(enc.encode(str).slice(0, bytes));
};

async function prepareDocument(page: PDFPage) {
	// split docs into smaller chunks, (smaller paragraphs)
	let { pageContent, metadata } = page;
	pageContent.replace(/\n/g, ''); // remove newlines

	// split docs into smaller chunks
	const docSplitter = new RecursiveCharacterTextSplitter();
	const docs = await docSplitter.splitDocuments([
		new Document({
			pageContent,
			metadata: {
				pageNumber: metadata.loc.pageNumber,
				text: truncateStringByBytes(pageContent, 36000),
			},
		}),
	]);

	return docs;
}
