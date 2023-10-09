import ChatComponent from '@/components/ChatComponent';
import ChatSideBar from '@/components/ChatSideBar';
import PDFViewer from '@/components/PDFViewer';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import React from 'react';

type Props = {
	params: {
		chat_id: string;
	};
};

export default async function ChatPage({ params: { chat_id } }: Props) {
	const { userId } = await auth();
	const isAuth = !!userId;

	if (!isAuth) {
		return redirect('/sign-in');
	}

	const _chats = await db
		.select()
		.from(chats)
		.where(eq(chats.userId, userId));

	if (!_chats) {
		return redirect('/');
	}

	if (!_chats.find((chat) => chat.id === +chat_id)) {
		return redirect('/');
	}

	const currentChat = _chats.find((chat) => chat.id === +chat_id);

	return (
		<div className="flex max-h-screen">
			<div className="flex w-full max-h-screen ">
				{/* chat sidebar */}
				<div className="flex-[1] max-w-xs">
					<ChatSideBar chatId={+chat_id} chats={_chats} />
				</div>
				{/* pdf viewer */}
				<div className="max-h-screen p-4 overflow-x-hidden overflow-y-visible flex-[5]">
					<PDFViewer pdf_url={currentChat?.pdfUrl || ''} />
				</div>
				{/* chat component*/}
				<div className="flex-[3] border-l-4 border-l-slate-300">
					<ChatComponent chatId={+chat_id} />
				</div>
			</div>
		</div>
	);
}
