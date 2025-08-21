'use server';

import { CHURCH_STEPS } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import { authActionClient } from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import { churchSchema, updateChurchSchema } from './schema';

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
      data,
      select: {
        id: true,
      },
    });

    revalidatePath('/my-listing');

    return {
      church,
    };
  });
