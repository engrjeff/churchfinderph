import * as z from 'zod';

export const churchSchema = z.object({
  name: z
    .string({ message: 'Church name is required.' })
    .min(1, { message: 'Church name is required.' }),

  street: z
    .string({ message: 'Street Address is required.' })
    .min(1, { message: 'Street Address is required.' }),

  region: z
    .string({ message: 'Region is required.' })
    .min(1, { message: 'Region is required.' }),

  province: z
    .string({ message: 'Province is required.' })
    .min(1, { message: 'Province is required.' }),

  city: z
    .string({ message: 'Town/City is required.' })
    .min(1, { message: 'Town/City is required.' }),

  barangay: z
    .string({ message: 'Barangay is required.' })
    .min(1, { message: 'Barangay is required.' }),

  zipCode: z.string().optional(),

  welcomeMessage: z
    .string({ message: 'Welcome message is required.' })
    .min(1, { message: 'Welcome message is required.' }),

  logo: z.url({ message: 'Invalid church logo url' })?.optional(),

  fullAddress: z.string(),
});

export const churchIdSchema = z.object({
  churchId: z.string({
    message: 'Church ID is required',
  }),
});

export const idSchema = z.object({
  id: z.string({
    message: 'ID is required',
  }),
});

export const updateChurchSchema = churchSchema.extend(idSchema.shape);

export const churchProfileSchema = z
  .object({
    mission: z.string().optional(),
    vision: z.string().optional(),
    churchSize: z.string({ message: 'Church size is required.' }),
    communionFrequency: z.string({
      message: 'Communion frequency is required.',
    }),
  })
  .extend(churchIdSchema.shape);

export const updateChurchProfileSchema = churchProfileSchema.extend(
  idSchema.shape
);

export const churchServiceSchema = z.object({
  title: z
    .string({ message: 'Service title is required.' })
    .min(1, { message: 'Service title is required.' }),
  day: z
    .string({ message: 'Service day is required.' })
    .min(1, { message: 'Service day is required.' }),
  time: z
    .string({ message: 'Service time is required.' })
    .min(1, { message: 'Service time is required.' }),
});

export const churchServicesSchema = z.object({
  churchId: z.string({ message: 'Church ID is required.' }),
  services: z
    .array(churchServiceSchema)
    .min(1, { message: 'At least one service is required.' })
    .superRefine((items, ctx) => {
      const uniqueItemsCount = new Set(
        items.map((item) =>
          [item.title.toLowerCase(), item.day, item.time].join('_')
        )
      ).size;

      const errorPosition = items.length - 1;

      if (uniqueItemsCount !== items.length) {
        ctx.addIssue({
          code: 'custom',
          message: `Already exists.`,
          path: [errorPosition, 'title'],
        });
      }
    }),
});

export const churchMinistrySchema = z.object({
  title: z
    .string({ message: 'Ministry title is required.' })
    .min(1, { message: 'Ministry title is required.' }),
});

export const churchPublicServiceSchema = z.object({
  title: z
    .string({ message: 'Public service title is required.' })
    .min(1, { message: 'Public service title is required.' }),
});

export const churchMinistriesAndPublicServicessSchema = z.object({
  churchId: z.string({ message: 'Church ID is required.' }),
  ministries: z
    .array(churchMinistrySchema)
    .min(1, { message: 'At least one ministry is required.' })
    .superRefine((items, ctx) => {
      const uniqueItemsCount = new Set(
        items.map((item) => item.title.toLowerCase())
      ).size;

      const errorPosition = items.length - 1;

      if (uniqueItemsCount !== items.length) {
        ctx.addIssue({
          code: 'custom',
          message: `Already exists.`,
          path: [errorPosition, 'title'],
        });
      }
    }),
  publicServices: z
    .array(churchPublicServiceSchema)
    .min(1, { message: 'At least one public service is required.' })
    .superRefine((items, ctx) => {
      const uniqueItemsCount = new Set(
        items.map((item) => item.title.toLowerCase())
      ).size;

      const errorPosition = items.length - 1;

      if (uniqueItemsCount !== items.length) {
        ctx.addIssue({
          code: 'custom',
          message: `Already exists.`,
          path: [errorPosition, 'title'],
        });
      }
    }),
});

// types
export type ChurchInputs = z.infer<typeof churchSchema>;
export type ChurchProfileInputs = z.infer<typeof churchProfileSchema>;
export type ChurchServicesInputs = z.infer<typeof churchServicesSchema>;
export type ChurchMinistriesAndPublicServicesInputs = z.infer<
  typeof churchMinistriesAndPublicServicessSchema
>;
