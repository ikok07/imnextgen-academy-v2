import {z} from "zod";

export const testimonialSchema = z.object({
    text: z.string(),
    name: z.string(),
    image: z.string().optional()
});

export type Testimonial = z.infer<typeof testimonialSchema>;