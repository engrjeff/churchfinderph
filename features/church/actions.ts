'use server';

import { CHURCH_STEPS } from '@/lib/constants';
import { prisma } from '@/lib/prisma';
import { authActionClient } from '@/lib/safe-action';
import { revalidatePath } from 'next/cache';
import slugify from 'slugify';
import {
  churchContactAndSocialsSchema,
  churchMinistriesAndPublicServicessSchema,
  churchProfileSchema,
  churchSchema,
  churchServicesSchema,
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

export const setChurchServices = authActionClient
  .metadata({ actionName: 'setChurchServices' })
  .inputSchema(churchServicesSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    if (!user?.userId) throw new Error('Session not found.');

    const foundChurch = await prisma.church.findUnique({
      where: {
        id: parsedInput.churchId,
      },
    });

    const stepsCompleted = new Set(foundChurch?.stepsCompleted || []);

    await prisma.churchService.deleteMany({
      where: {
        churchId: parsedInput.churchId,
        userId: user.userId,
      },
    });

    const services = await prisma.churchService.createMany({
      data: parsedInput.services.map((service) => ({
        ...service,
        churchId: parsedInput.churchId,
        userId: user.userId,
      })),
    });

    stepsCompleted.add(CHURCH_STEPS.SERVICES);

    await prisma.church.update({
      where: {
        id: parsedInput.churchId,
      },
      data: {
        stepsCompleted: {
          set: Array.from(stepsCompleted),
        },
      },
    });

    revalidatePath(`/my-listing/${parsedInput.churchId}`);

    return {
      services,
    };
  });

export const setChurchMinistriesAndPublicServices = authActionClient
  .metadata({ actionName: 'setChurchMinistriesAndPublicServices' })
  .inputSchema(churchMinistriesAndPublicServicessSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    if (!user?.userId) throw new Error('Session not found.');

    const foundChurch = await prisma.church.findUnique({
      where: {
        id: parsedInput.churchId,
      },
    });

    const stepsCompleted = new Set(foundChurch?.stepsCompleted || []);

    // delete existing ministries and public services
    await prisma.ministry.deleteMany({
      where: {
        churchId: parsedInput.churchId,
        userId: user.userId,
      },
    });

    await prisma.publicService.deleteMany({
      where: {
        churchId: parsedInput.churchId,
        userId: user.userId,
      },
    });

    // set new ministries and public services
    const ministries = await prisma.ministry.createMany({
      data: parsedInput.ministries.map((ministry) => ({
        ...ministry,
        churchId: parsedInput.churchId,
        userId: user.userId,
      })),
    });

    const publicServices = await prisma.publicService.createMany({
      data: parsedInput.publicServices.map((publicService) => ({
        ...publicService,
        churchId: parsedInput.churchId,
        userId: user.userId,
      })),
    });

    stepsCompleted.add(CHURCH_STEPS.MINISTRIES);

    await prisma.church.update({
      where: {
        id: parsedInput.churchId,
      },
      data: {
        stepsCompleted: {
          set: Array.from(stepsCompleted),
        },
      },
    });

    revalidatePath(`/my-listing/${parsedInput.churchId}`);

    return {
      ok: true,
      ministries: ministries.count,
      publicServices: publicServices.count,
    };
  });

export const setChurchContactAndSocialLinks = authActionClient
  .metadata({ actionName: 'setChurchContactAndSocialLinks' })
  .inputSchema(churchContactAndSocialsSchema)
  .action(async ({ parsedInput, ctx: { user } }) => {
    if (!user?.userId) throw new Error('Session not found.');

    const foundChurch = await prisma.church.findUnique({
      where: {
        id: parsedInput.churchId,
      },
    });

    const stepsCompleted = new Set(foundChurch?.stepsCompleted || []);

    // delete existing church contact and social links
    await prisma.churchContact.deleteMany({
      where: {
        churchId: parsedInput.churchId,
        userId: user.userId,
      },
    });

    await prisma.contactInfo.deleteMany({
      where: {
        churchId: parsedInput.churchId,
        userId: user.userId,
      },
    });

    await prisma.socialLink.deleteMany({
      where: {
        churchId: parsedInput.churchId,
        userId: user.userId,
      },
    });

    // set new church contact and social links
    stepsCompleted.add(CHURCH_STEPS.CONTACT_DETAILS);

    const updatedChurch = await prisma.church.update({
      where: {
        id: parsedInput.churchId,
      },
      data: {
        contactDetails: {
          create: {
            email: parsedInput.contactInfo.email,
            website: parsedInput.contactInfo.website,
            userId: user.userId,
          },
        },
        contactInfo: {
          createMany: {
            data: parsedInput.phoneNumbers.map((p) => ({
              value: p.value,
              isPrimary: p.isPrimary,
              userId: user.userId,
            })),
          },
        },
        socialLinks: {
          createMany: {
            data: parsedInput.socialLinks.map((s) => ({
              url: s.url,
              platform: s.platform,
              userId: user.userId,
            })),
          },
        },
        stepsCompleted: {
          set: Array.from(stepsCompleted),
        },
      },
    });

    revalidatePath(`/my-listing/${parsedInput.churchId}`);

    return {
      church: updatedChurch,
    };
  });
