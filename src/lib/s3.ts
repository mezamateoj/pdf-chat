import {
	PutObjectCommandOutput,
	S3,
	S3Client,
	PutObjectCommand,
} from '@aws-sdk/client-s3';
import { sanitizeFilename } from './utils';

export async function uploadToS3(
	file: File
): Promise<{ file_key: string; file_name: string }> {
	try {
		// Create S3 instance
		const s3 = new S3Client({
			region: process.env.NEXT_PUBLIC_S3_REGION!,
			credentials: {
				accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
				secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
			},
		});

		const file_key =
			'uploads/' + Date.now().toString() + sanitizeFilename(file.name);

		const params = {
			ContentType: file.type,
			Key: file_key,
			Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
			Body: file,
			ContentLength: file.size,
		};

		// Upload file to S3 and await the response
		const data = await s3.send(new PutObjectCommand(params));

		return {
			file_key,
			file_name: file.name,
		};
	} catch (err) {
		console.error('Error uploading to S3 from upload function', err);
		throw err;
	}
}

export function getS3Url(file_key: string) {
	const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${file_key}`;
	return url;
}
