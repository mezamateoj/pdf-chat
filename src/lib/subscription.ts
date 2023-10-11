import { auth } from '@clerk/nextjs';
import { userSubscription } from './db/schema';
import { db } from './db';
import { eq } from 'drizzle-orm';

const DAY = 1000 * 60 * 60 * 24;

export const checkSubscription = async () => {
	const { userId } = await auth();

	if (!userId) return false;

	const _userSubscriptions = await db
		.select()
		.from(userSubscription)
		.where(eq(userSubscription.userId, userId));

	if (!_userSubscriptions[0]) return false;

	const subUser = _userSubscriptions[0];

	// check if subscription is valid
	const valid =
		subUser.stripePriceId &&
		subUser.stripeCurrentPeriodEnd?.getTime()! + DAY > Date.now();

	return !!valid;
};
