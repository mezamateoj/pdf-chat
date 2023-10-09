import { PutObjectCommandOutput, S3 } from '@aws-sdk/client-s3';

export async function uploadToS3(
	file: File
): Promise<{ file_key: string; file_name: string }> {
	return new Promise((resolve, reject) => {
		try {
			// create s3 instance
			const s3 = new S3({
				region: process.env.NEXT_PUBLIC_S3_REGION!,
				credentials: {
					accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
					secretAccessKey:
						process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
				},
			});

			const file_key =
				'uploads/' +
				Date.now().toString() +
				file.name.replace(' ', '-');

			const params = {
				ContentType: 'application/pdf',
				Key: file_key,
				Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
				Body: file,
			};

			// method to upload file to s3
			s3.putObject(
				params,
				(err: any, data: PutObjectCommandOutput | undefined) => {
					console.log(`File uploaded successfully to ${file_key}`);
					return resolve({
						file_key,
						file_name: file.name,
					});
				}
			);
		} catch (err) {
			console.error('Error uploading to S3:', err);
			reject(err);
		}
	});
}

export function getS3Url(file_key: string) {
	const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_S3_REGION}.amazonaws.com/${file_key}`;
	return url;
}
