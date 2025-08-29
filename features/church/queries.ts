'use server';

import { PublishStatus } from '@/app/generated/prisma';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

interface GetChurchesArgs {}

export async function getChurches(args: GetChurchesArgs) {
  const churches = await prisma.church.findMany({
    where: { status: PublishStatus.PUBLISHED },
    include: {
      profile: true,
      churchMedia: true,
      services: true,
      churchMap: true,
    },
  });

  return {
    churches,
  };
}

export async function getChurchDetails(params: { churchId: string }) {
  const church = await prisma.church.findUnique({
    where: { id: params.churchId },
    include: {
      profile: true,
      contactDetails: true,
      pastorDetails: true,
      churchMedia: true,
      churchMap: true,
      services: true,
      ministries: true,
      publicServices: true,
      contactInfo: true,
      socialLinks: true,
    },
  });

  return { church };
}

export async function getUserChurchListing() {
  const user = await auth();

  if (!user?.userId) {
    throw new Error('User not authenticated');
  }

  const listing = await prisma.church.findMany({
    where: { userId: user.userId },
    include: {
      profile: true,
      contactDetails: true,
      pastorDetails: true,
      churchMedia: true,
      churchMap: true,
      services: true,
      ministries: true,
      publicServices: true,
      contactInfo: true,
      socialLinks: true,
    },
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
    include: {
      profile: true,
      contactDetails: true,
      pastorDetails: true,
      churchMedia: true,
      churchMap: true,
      services: true,
      ministries: true,
      publicServices: true,
      contactInfo: true,
      socialLinks: true,
    },
  });

  return church;
}
