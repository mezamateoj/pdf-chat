import { Button } from '@/components/ui/button';
import { UserButton, auth } from '@clerk/nextjs';
import Link from 'next/link';
import { LogIn } from 'lucide-react';
import { currentUser } from '@clerk/nextjs';
import type { User } from '@clerk/nextjs/api';
import { default as FileUpload } from '@/components/FileUpload';

export default async function Home() {
	const { userId } = auth();
	const isAuth = !!userId;
	const user: User | null = await currentUser();

	return (
		<div className="w-screen min-h-screen bg-gradient-to-bl from-indigo-200 via-red-200 to-yellow-100">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<div className="flex flex-col items-center text-center">
					<div className="flex items-center mt-5 flex-col-reverse">
						<h1 className=" text-xl font-semibold sm:text-3xl md:text-5xl mt-8 text-white">
							Chatea con tu PDF
						</h1>
						<UserButton afterSignOutUrl="/" />
					</div>
					<div className="flex mt-5">
						{isAuth && (
							<Button className="bg-gray-100 text-black hover:bg-gray-200">
								Ir al chat
							</Button>
						)}
					</div>

					<p className="max-w-xl text-sm sm:text-lg mt-2  sm:font-medium text-transparent bg-clip-text bg-gradient-to-br from-violet-600 via-orange-400 to-fuchsia-400">
						Join million of students, researchers and professionals
						to instantly answer questions and understand research
						with AI
					</p>
					<div className="text-white mt-2 font-bold md:text-2xl">
						{user && (
							<p className="italic text-sm sm:text-lg">
								{user?.firstName || user.lastName}, Sube tu PDF
							</p>
						)}
					</div>
					<div className="w-full mt-5">
						{isAuth ? (
							<FileUpload />
						) : (
							<Link href="/sign-in">
								<Button className="bg-slate-100 text-black hover:bg-slate-200 transition-all duration-200">
									Inicia sesion para empezar
									<LogIn className="w-4 h-4 ml-2" />
								</Button>
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
