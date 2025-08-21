'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function getUserChurchListing() {
  const user = await auth();

  if (!user?.userId) {
    throw new Error('User not authenticated');
  }

  const listing = await prisma.church.findMany({
    where: { userId: user.userId },
  });

  return listing;
}
