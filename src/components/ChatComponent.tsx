'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Message, useChat } from 'ai/react';
import { Button } from './ui/button';
import { SendIcon } from 'lucide-react';
import MessageList from './MessageList';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
	chatId: number;
};

export default function ChatComponent({ chatId }: Props) {
	const { data, isLoading } = useQuery({
		queryKey: ['chat', chatId],
		queryFn: async () => {
			const response = await axios.post<Message[]>('/api/get-messages', {
				chatId,
			});
			return response.data;
		},
	});
	const { messages, input, handleInputChange, handleSubmit } = useChat({
		api: '/api/chat',
		body: { chatId },
		initialMessages: data || [],
	});

	React.useEffect(() => {
		const messageContainer = document.getElementById('message-container');
		if (messageContainer) {
			messageContainer.scrollTo({
				top: messageContainer.scrollHeight,
				behavior: 'smooth',
			});
		}
	}, [messages]);

	return (
		<div
			className="relative max-h-screen overflow-y-scroll"
			id="message-container"
		>
			<div className="sticky top-0 inset-x-0 p-2 bg-white h-fit">
				<h3 className="text-xl font-bold">Chat</h3>
			</div>

			{/* message list */}
			<div className="p-2">
				<MessageList messages={messages} isLoading={isLoading} />
			</div>
			<form
				action=""
				onSubmit={handleSubmit}
				className="sticky bottom-0 inset-x-0 px-2 py-4 bg-white"
			>
				<div className="flex mt-2">
					<Input
						value={input}
						onChange={handleInputChange}
						placeholder="Ask any question..."
						className="w-full"
					/>
					<Button className="bg-blue-500 ml-2">
						<SendIcon className="w-4 h-4" />
					</Button>
				</div>
			</form>
		</div>
	);
}
