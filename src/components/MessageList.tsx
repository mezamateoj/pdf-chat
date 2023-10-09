import { cn } from '@/lib/utils';
import { Message } from 'ai/react';
import { Loader2 } from 'lucide-react';
import React from 'react';

type Props = {
	messages: Message[];
	isLoading: boolean;
};

export default function MessageList({ messages, isLoading }: Props) {
	if (isLoading) {
		return (
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<Loader2 className="animate-spin w-6 h-6" />
			</div>
		);
	}
	if (messages.length === 0) {
		return <div className="font-bold ml-2">🪄 start chatting...</div>;
	}
	return (
		<div className="flex flex-col gap-2 px-4">
			{messages.map((m) => (
				<div
					key={m.id}
					className={cn('flex', {
						'justify-end pl-10': m.role === 'user',
						'justify-start pr-10': m.role === 'assistant',
					})}
				>
					<div
						className={cn(
							'rounded-md px-3 text-sm py-1 shadow-md ring-1',
							{
								'bg-blue-500 text-white': m.role === 'user',
								'bg-gray-200 text-gray-700':
									m.role === 'assistant',
							}
						)}
					>
						<p>{m.content}</p>
					</div>
				</div>
			))}
		</div>
	);
}
