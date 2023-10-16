import {
	MercadoPagoConfig,
	Preference,
	PreferenceCreateData,
} from 'mercadopago';

import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs';

const client = new MercadoPagoConfig({
	accessToken: process.env.MERCADO_ACCESS_TOKEN!,
});

const return_url = process.env.NEXT_PUBLIC_BASE_URL + '/';

const preferences = new Preference(client);

export async function POST() {
	const { userId } = auth();

	if (!userId) {
		return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
	}

	try {
		const preferenceData: PreferenceCreateData = {
			body: {
				items: [
					{
						title: 'ChatPDF Pro',
						unit_price: 10,
						currency_id: 'USD',
						quantity: 1,
					},
				],
				back_urls: {
					success: return_url,
					failure: return_url,
				},
				auto_return: 'approved',
			},
		};

		const response = await preferences.create(preferenceData);

		return NextResponse.json(
			{
				preference_id: response.id,
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return NextResponse.json(
			{ error: 'Something went wrong' },
			{ status: 401 }
		);
	}
}
