import { defineCollection, z } from "astro:content";

const guide = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    lastReviewed: z.string(),
  }),
});

const partials = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().optional(),
  }),
});

export const collections = { guide, partials };
