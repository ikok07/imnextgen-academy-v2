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
        ]
    },
    transpilePackages: ['@mep-agency/next-iubenda'],
};

export default withNextIntl(withNextVideo(nextConfig));
