'use client';

import React from 'react';
import { Button } from './ui/button';
import axios from 'axios';

type Props = {
	isPro: boolean;
};

export default function SubButton(props: Props) {
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
		<Button disabled={loading} onClick={handleSubscription}>
			{props.isPro ? 'Manage Subscription' : 'Subscribe to Pro'}
		</Button>
	);
}
