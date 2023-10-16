'use client';
import React from 'react';
import { Button } from './ui/button';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import axios from 'axios';
import { useAuth } from '@clerk/nextjs';
import { toast } from 'sonner';
import MercadoModal from './MercadoModal';

initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PUBLIC_KEY!);

export default function MercadoPago() {
	const [preferenceId, setPreferenceId] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const { userId } = useAuth();

	const handlePay = async () => {
		if (!userId) {
			toast.error('You need to be logged in to pay', {
				position: 'top-center',
			});
			return null;
		}
		try {
			setIsLoading(true);
			const res = await axios.post('/api/pay');
			console.log(res.data);
			setPreferenceId(res.data.preference_id);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			toast.error('Something went wrong with the payment');
		}
	};

	return (
		<div>
			<MercadoModal
				onClick={handlePay}
				preferenceId={preferenceId}
				loading={isLoading}
			/>
		</div>
	);
}
