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
                hostname: "ozwkuahulnwluilmnjjr.supabase.co"
            }
        ]
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
    },
    transpilePackages: ['@mep-agency/next-iubenda'],
};

export default withNextIntl(withNextVideo(nextConfig));
