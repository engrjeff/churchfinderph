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

export async function getUserChurchById({ churchId }: { churchId: string }) {
  const user = await auth();

  if (!user?.userId) {
    throw new Error('User not authenticated');
  }

  const church = await prisma.church.findFirst({
    where: { id: churchId, userId: user.userId },
  });

  if (!church) {
    throw new Error(
      'Church not found or you do not have permission to view it'
    );
  }

  return church;
}
