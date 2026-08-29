import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const insightSchema = z
  .object({
    locale: z.enum(['en', 'de']),
    translationKey: z
      .string()
      .min(1)
      .regex(/^[a-z0-9-]+$/),
    slug: z
      .string()
      .min(1)
      .regex(/^[a-z0-9-]+$/),
    title: z.string().min(1).max(120),
    description: z.string().min(1).max(180),
    status: z.enum(['draft', 'reviewed', 'published']).default('draft'),
    claimReview: z.enum(['pending', 'complete']).default('pending'),
    brandReview: z.enum(['pending', 'complete']).default('pending'),
    securityReview: z.enum(['not-required', 'pending', 'complete']).default('not-required'),
    publishedAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    topics: z.array(z.string().min(1)).default([]),
  })
  .superRefine((entry, context) => {
    if (entry.status !== 'published') return;

    if (entry.claimReview !== 'complete') {
      context.addIssue({
        code: 'custom',
        path: ['claimReview'],
        message: 'Published insights require completed claim review.',
      });
    }

    if (entry.brandReview !== 'complete') {
      context.addIssue({
        code: 'custom',
        path: ['brandReview'],
        message: 'Published insights require completed brand review.',
      });
    }

    if (entry.securityReview === 'pending') {
      context.addIssue({
        code: 'custom',
        path: ['securityReview'],
        message: 'Published insights cannot have a pending security review.',
      });
    }

    if (!entry.publishedAt) {
      context.addIssue({
        code: 'custom',
        path: ['publishedAt'],
        message: 'Published insights require a publication date.',
      });
    }
  });

const insights = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/insights' }),
  schema: insightSchema,
});

export const collections = { insights };
