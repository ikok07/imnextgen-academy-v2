/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
import {withNextVideo} from "next-video/process"

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.clerk.com"
            },
            {
                protocol: "https",
                hostname: "beta.academy.imnextgen.bg"
            },
        ]
    }
};

export default withNextIntl(withNextVideo(nextConfig));
