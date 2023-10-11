'use client';
import { uploadToS3 } from '@/lib/s3';
import { Inbox, Loader2 } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const successToast = () => {
	toast('File uploaded', {
		duration: 4000,
		position: 'top-center',
		description: 'Your file has been uploaded successfully',
	});
};

const errorToast = (message: string, desc: string) => {
	toast.error(message, {
		duration: 4000,
		description: desc,
		position: 'top-center',
	});
};

function FileUpload() {
	const [uploading, setUploading] = React.useState(false);
	const router = useRouter();

	const { mutate, isLoading } = useMutation({
		mutationFn: async ({
			file_key,
			file_name,
		}: {
			file_key: string;
			file_name: string;
		}) => {
			const response = await axios.post('/api/create-chat', {
				file_key,
				file_name,
			});
			if (isLoading) {
				console.log('loading');
			}
			console.log('Success uploading file');
			return response.data;
		},
	});

	const { getRootProps, getInputProps } = useDropzone({
		accept: { 'application/pdf': ['.pdf'] },
		maxFiles: 1,
		onDrop: async (acceptedFiles) => {
			const file = acceptedFiles[0];

			// if file is larger than 10MB
			if (file.size > 10 * 1024 * 1024) {
				errorToast(
					'File too large',
					'Please try again with a smaller file'
				);
				return;
			}

			try {
				setUploading(true);
				const data = await uploadToS3(file);
				if (!data?.file_key || !data.file_name) {
					errorToast('File upload failed', 'Please try again');
					return;
				}

				mutate(data, {
					onSuccess: ({ chat_id }) => {
						successToast();
						router.push(`/chat/${chat_id}`);
					},
					onError: (error) => {
						console.log('error ' + error);
						errorToast('File upload failed', 'Please try again');
					},
				});
			} catch (error) {
				console.log(error);
				errorToast('File upload failed', 'Please try again');
			} finally {
				setUploading(false);
			}
		},
	});

	return (
		<div className="p-2 bg-white rounded-xl">
			<div
				{...getRootProps({
					className:
						'border-2 border-dashed bg-gray-200 rounded-xl p-6 flex justify-center items-center flex-col hover:cursor-pointer',
				})}
			>
				<input type="text" {...getInputProps()} />
				{uploading || isLoading ? (
					<>
						<Loader2 className="h-10 w-10 text-blue-500 animate-spin" />
						<p className="mt-2 text-sm text-slate-500">
							Uploading PDF...
						</p>
					</>
				) : (
					<>
						<Inbox className="sm:w-12 sm:h-12 w-9 h-9 text-blue-500" />
						<p className="mt-2 text-xs sm:test-sm text-slate-400">
							Drop PDF here
						</p>
					</>
				)}
			</div>
		</div>
	);
}

export default FileUpload;
