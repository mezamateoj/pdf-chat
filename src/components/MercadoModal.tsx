'use client';
import React from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Wallet } from '@mercadopago/sdk-react';

type Props = {
	preferenceId: string;
	onClick: () => void;
	loading: boolean;
};

export default function MercadoModal({
	preferenceId,
	onClick,
	loading,
}: Props) {
	return (
		<div>
			<Dialog>
				{/* <DialogTrigger>Open</DialogTrigger> */}
				<DialogTrigger asChild>
					<Button onClick={onClick} variant="outline">
						Pay
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Subscribe to ChatPDF Pro</DialogTitle>
						<DialogDescription>
							Pay securely with MercadoPago and enjoy more chats
							{loading && (
								<div className="flex justify-center">
									<div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-900 mt-2"></div>
								</div>
							)}
							{preferenceId && !loading && (
								<Wallet
									initialization={{
										preferenceId: preferenceId,
									}}
								/>
							)}
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
