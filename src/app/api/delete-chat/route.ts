import { db } from '@/lib/db';
import { chats, messages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const DELETE = async (req: Request) => {
	// console.log(req);
	const { chatId } = await req.json();
	await db.delete(messages).where(eq(messages.chatId, chatId));
	console.log('deleted messages');
	await db.delete(chats).where(eq(chats.id, chatId));
	console.log('deleted chat');
	return NextResponse.json({ success: true });
};
