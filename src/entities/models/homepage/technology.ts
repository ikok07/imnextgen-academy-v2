import {z} from "zod";

export const technologySchema = z.object({
    id: z.string(),
    image: z.string(),
    title: z.string(),
    description: z.string(),
    language: z.string(),
    code: z.string()
});

export type Technology = z.infer<typeof technologySchema>;