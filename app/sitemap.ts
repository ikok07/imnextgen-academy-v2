import {MetadataRoute} from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = process.env.NEXT_PUBLIC_BASE_URL;

    return [
        {
            url: `${base}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 1
        },
        {
            url: `${base}/privacy`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3
        },
        {
            url: `${base}/cookies`,
            lastModified: new Date(),
            changeFrequency: "yearly",
            priority: 0.3
        }
    ]
}
