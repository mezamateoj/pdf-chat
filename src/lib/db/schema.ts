import {
	varchar,
	pgTable,
	serial,
	timestamp,
	text,
	integer,
	pgEnum,
} from 'drizzle-orm/pg-core';

export const userSystemEnum = pgEnum('user_system', ['system', 'user']); // enum type, to differentiate between system (chatgpt) and user messages

export const chats = pgTable('chats', {
	id: serial('id').primaryKey(),
	pdfName: text('pdf_name').notNull(),
	pdfUrl: text('pdf_url').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	userId: varchar('user_id', { length: 256 }).notNull(),
	fileKey: text('file_key').notNull(),
});

export type DrizzleChat = typeof chats.$inferSelect;

export const messages = pgTable('messages', {
	id: serial('id').primaryKey(),
	chatId: integer('chat_id')
		.references(() => chats.id)
		.notNull(), // foreign key, a field (or collection of fields) in one table, that refers to the PRIMARY KEY in another table
	content: text('content').notNull(),
	createdAt: timestamp('created_at').notNull().defaultNow(),
	role: userSystemEnum('role').notNull(),
});
