import { Button } from '@/components/ui/button';
import { UserButton, auth } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowBigRight, ArrowRight, LogIn } from 'lucide-react';
import { currentUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';
import { default as FileUpload } from '@/components/FileUpload';
import { checkSubscription } from '@/lib/subscription';
import SubButton from '@/components/SubButton';
import { db } from '@/lib/db';
import { chats } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import MercadoPago from '@/components/MercadoPago';

export default async function Home() {
	const { userId } = auth();
	const isAuth = !!userId;
	const user: User | null = await currentUser();

	const isPro = await checkSubscription();

	let firstChat;
	if (userId) {
		firstChat = await db
			.select()
			.from(chats)
			.where(eq(chats.userId, userId));
		if (firstChat) {
			firstChat = firstChat[0];
		}
	}

	return (
		<div className="w-screen min-h-screen bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<div className="flex flex-col items-center text-center">
					<div className="flex items-center mt-5 flex-col-reverse">
						<h1 className=" text-xl font-semibold sm:text-3xl md:text-5xl mt-8 text-white">
							Chat with your PDF
						</h1>
						<UserButton afterSignOutUrl="/" />
					</div>
					<div className="flex mt-5">
						{isAuth && (
							<Link href={`/chat/${firstChat?.id}`}>
								<Button className="bg-gray-100 text-black hover:bg-gray-200 flex items-center">
									Chats{' '}
									<ArrowRight className="w-5 h-5 ml-1" />
								</Button>
							</Link>
						)}
						<div className="ml-3">
							<SubButton isPro={isPro} />
						</div>
					</div>

					<p className="max-w-xl text-sm sm:text-lg mt-2  sm:font-medium text-transparent bg-clip-text bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-zinc-100 via-neutral-300 to-cyan-200">
						Join million of students, researchers and professionals
						to instantly answer questions from your PDF thanks to
						<span className="font-bold border-b border-slate-500">
							{' '}
							OpenAI.
						</span>
					</p>
					<div className="w-full mt-5">
						{isAuth ? (
							<FileUpload />
						) : (
							<Link href="/sign-in">
								<Button className="bg-slate-100 text-black hover:bg-slate-200 transition-all duration-200">
									Sign in
									<LogIn className="w-4 h-4 ml-2" />
								</Button>
							</Link>
						)}
					</div>
				</div>
				<MercadoPago />
			</div>
		</div>
	);
}
