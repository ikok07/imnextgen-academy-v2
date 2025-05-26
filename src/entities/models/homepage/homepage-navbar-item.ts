import {z} from "zod";

export const homepageNavbarItemSchema = z.object({
    label: z.string(),
    href: z.string(),
});

export type HomepageNavbarItem = z.infer<typeof homepageNavbarItemSchema>;