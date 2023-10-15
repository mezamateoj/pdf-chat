'use client';
import { uploadToS3 } from '@/lib/s3';
import { File, Inbox, Loader2, UploadCloud } from 'lucide-react';
import React, { useState } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Progress } from './ui/progress';

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
	});
};

const UploadDropzone = () => {
	const [isUploading, setIsUploading] = useState(false);
	const [uploadProgress, setUploadProgress] = useState(0);
	const router = useRouter();

	// deterministically update progress bar
	const startSimulatedUpload = () => {
		setUploadProgress(0);
		const interval = setInterval(() => {
			setUploadProgress((prevProgress) => {
				if (prevProgress >= 95) {
					clearInterval(interval);
					return prevProgress;
				}
				return prevProgress + 5;
			});
		}, 500);

		return interval;
	};

	const { mutate } = useMutation({
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

			setUploadProgress(100);
			return response.data;
		},
	});

	return (
		<Dropzone
			multiple={false}
			onDrop={async (acceptedFile) => {
				const file = acceptedFile[0];
				setIsUploading(true);
				const progressInterval = startSimulatedUpload();

				try {
					const data = await uploadToS3(file);

					if (!data?.file_key || !data.file_name) {
						throw new Error('File upload failed');
					}

					mutate(data, {
						onSuccess: ({ chat_id }) => {
							successToast();
							clearInterval(progressInterval);
							setIsUploading(false);
							router.push(`/chat/${chat_id}`);
						},
						onError: (error) => {
							console.log('error ' + error);
							errorToast(
								'File upload failed',
								'Please try again'
							);
						},
					});
				} catch (error) {
					console.log(error);
					errorToast('File upload failed', 'Please try again');
					clearInterval(progressInterval);
					setIsUploading(false);
				}
				// handle file upload
			}}
		>
			{({ getRootProps, getInputProps, acceptedFiles }) => (
				<div
					{...getRootProps()}
					className="border h-64 m-4 border-dashed border-gray-300 rounded-md"
				>
					<div className="flex items-center justify-center h-full w-full">
						<label
							htmlFor="dropzone-file"
							className="flex flex-col items-center justify-center h-full w-full cursor-pointer rounded-md bg-gray-50 hover:bg-gray-100"
						>
							<div className="flex flex-col items-center justify-center pt-5 pb-6">
								<UploadCloud className="sm:w-12 sm:h-12 w-9 h-9 text-blue-500 mb-2" />
								<p className="mb-2 text-sm text-zinc-700">
									<span className="font-semibold">
										Click to upload
									</span>{' '}
									or drag and drop
								</p>
								<p className="text-xs text-zinc-500">
									PDF (up to 4MB)
								</p>
							</div>
							{acceptedFiles && acceptedFiles[0] ? (
								<div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
									<div className="px-3 py-2 h-full grid place-items-center">
										<File className="h-5 w-5 text-blue-500" />
									</div>
									<div className="px-3 py-2 h-full grid text-sm truncate">
										{acceptedFiles[0].name}
									</div>
								</div>
							) : null}

							{isUploading ? (
								<div className="w-full mt-4 max-w-xs mx-auto">
									<Progress
										value={uploadProgress}
										className="h-2 w-full bg-zinc-200"
									/>
								</div>
							) : null}
						</label>
					</div>
				</div>
			)}
		</Dropzone>
	);
};

function FileUpload() {
	return (
		<div className="p-2 bg-white rounded-xl">
			<UploadDropzone />
		</div>
	);
}

export default FileUpload;
