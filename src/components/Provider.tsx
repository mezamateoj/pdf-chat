'use client';
import React from 'react';
import {
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query';

// Create a client
const queryClient = new QueryClient();

type Props = {
	children: React.ReactNode;
};

export default function Provider({ children }: Props) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
}
