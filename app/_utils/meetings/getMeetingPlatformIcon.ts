import {MeetingPlatform} from "@/drizzle/schema/meetings";

export function getMeetingPlatformIcon(platform: MeetingPlatform): { path: string, pathDark: string, width: number } {
    const basePath = "/meeting-platforms";

    switch (platform) {
        case "zoom":
            return {
                path: `${basePath}/zoom.svg`,
                pathDark: `${basePath}/zoom.svg`,
                width: 40
            }
    }
}