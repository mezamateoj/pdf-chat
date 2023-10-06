import { Configuration, OpenAIApi } from 'openai-edge';

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY!,
});

const openai = new OpenAIApi(configuration);

export async function getEmbeddings(text: string) {
	try {
		const res = await openai.createEmbedding({
			model: 'text-embedding-ada-002',
			input: text.replace(/\n/g, ' '),
		});
		const result = await res.json();
		return result.data[0].embedding as number[];
	} catch (error) {
		console.log(error);
	}
}
