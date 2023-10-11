'use client';
import { DrizzleChat } from '@/lib/db/schema';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { MessageCircle, PlusCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import axios from 'axios';

type Props = {
	chats: DrizzleChat[];
	chatId: number;
};

export default function ChatSideBar({ chats, chatId }: Props) {
	const [loading, setLoading] = React.useState(false);

	const handleSubscription = async () => {
		try {
			setLoading(true);
			const response = await axios.get('/api/stripe');
			window.location.href = response.data.url;
		} catch (error) {
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div className="w-full h-screen p-4 text-gray-200 bg-gray-900 overflow-y-auto">
			<Link href={'/'}>
				<Button className="w-full border-dashed border-white border">
					<PlusCircleIcon className="mr-2 w-4 h-4" />
					Create new Chat
				</Button>
			</Link>
			<div className="flex items-center justify-center p-2">
				<Button
					onClick={handleSubscription}
					className="mt-2 text-white font-bold capitalize  bg-green-500 hover:bg-green-600"
					disabled={loading}
				>
					Upgrade to Pro 🚀
				</Button>
			</div>

			<div className="flex flex-col gap-2 mt-4">
				{chats.map((chat) => (
					<Link key={chat.id} href={`/chat/${chat.id}`}>
						<div
							className={cn(
								'rounded-lg p-3 text-slate-300 flex items-center',
								{
									'bg-blue-600 text-white':
										chatId === chat.id,
									'hover:text-white': chatId !== chat.id,
								}
							)}
						>
							<MessageCircle className="mr-2 w-4 h-4" />
							<p className="w-full text-sm truncate whitespace-nowrap text-ellipsis overflow-hidden">
								{chat.pdfName}
							</p>
						</div>
					</Link>
				))}

				{/* <div className="absolute bottom-4 left-4">
					<div className="flex items-center gap-2 text-sm text-slate-500 flex-wrap">
						<Link href={'/'}>Home</Link>
					</div>
				</div> */}
			</div>
		</div>
	);
}
