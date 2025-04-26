import {MeetingPlatform} from "@/drizzle/schema/meetings";

export function getMeetingPlatformIcon(platform: MeetingPlatform): { path: string, width: number } {
    const basePath = "/meetings-platforms"
    switch (platform) {
        case "zoom":
            return {path: `${basePath}/zoom.svg`, width: 40}
    }
}