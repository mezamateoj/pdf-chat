'use client';
import { DrizzleChat } from '@/lib/db/schema';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { MessageCircle, PlusCircleIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Props = {
	chats: DrizzleChat[];
	chatId: number;
};

export default function ChatSideBar({ chats, chatId }: Props) {
	return (
		<div className="w-full h-screen p-4 text-gray-200 bg-gray-900 overflow-y-auto">
			<Link href={'/'}>
				<Button className="w-full border-dashed border-white border">
					<PlusCircleIcon className="mr-2 w-4 h-4" />
					Create new Chat
				</Button>
			</Link>

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
			</div>
		</div>
	);
}
