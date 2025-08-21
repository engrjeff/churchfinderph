'use server';

import { CHURCH_STEPS } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import { authActionClient } from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import {
  churchProfileSchema,
  churchSchema,
  updateChurchProfileSchema,
  updateChurchSchema,
} from './schema';

export const createChurch = authActionClient
  .metadata({ actionName: 'createChurch' })
  .inputSchema(churchSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    if (!user?.userId) throw new Error('Session not found.');

    const church = await prisma.church.create({
      data: {
        userId: user.userId,
        slug: slugify(parsedInput.name),
        stepsCompleted: [CHURCH_STEPS.BASIC],
        ...parsedInput,
      },
      select: {
        id: true,
      },
    });

    revalidatePath('/my-listing');

    return {
      church,
    };
  });

export const updateChurch = authActionClient
  .metadata({ actionName: 'updateChurch' })
  .inputSchema(updateChurchSchema)
  .action(async ({ parsedInput: { id, ...data }, ctx: { user } }) => {
    if (!user?.userId) throw new Error('Session not found.');

    const church = await prisma.church.update({
      where: {
        id,
      },
      data: {
        ...data,
        slug: slugify(data.name),
      },
      select: {
        id: true,
      },
    });

    revalidatePath(`/my-listing/${church.id}`);

    return {
      church,
    };
  });

export const createChurchProfile = authActionClient
  .metadata({ actionName: 'createChurchProfile' })
  .inputSchema(churchProfileSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    if (!user?.userId) throw new Error('Session not found.');

    const churchProfile = await prisma.churchProfile.create({
      data: {
        userId: user.userId,
        ...parsedInput,
      },
      select: {
        id: true,
        churchId: true,
      },
    });

    // update church steps
    if (churchProfile.id) {
      await prisma.church.update({
        where: {
          id: churchProfile.churchId,
        },
        data: {
          stepsCompleted: {
            push: CHURCH_STEPS.PROFILE,
          },
        },
      });
    }

    revalidatePath(`/my-listing/${churchProfile.churchId}`);

    return {
      churchProfile,
    };
  });

export const updateChurchProfile = authActionClient
  .metadata({ actionName: 'updateChurchProfile' })
  .inputSchema(updateChurchProfileSchema)
  .action(async ({ parsedInput: { id, ...data }, ctx: { user } }) => {
    if (!user?.userId) throw new Error('Session not found.');

    const churchProfile = await prisma.churchProfile.update({
      where: {
        id,
      },
      data,
      select: {
        id: true,
        churchId: true,
      },
    });

    revalidatePath(`/my-listing/${churchProfile.churchId}`);

    return {
      churchProfile,
    };
  });
