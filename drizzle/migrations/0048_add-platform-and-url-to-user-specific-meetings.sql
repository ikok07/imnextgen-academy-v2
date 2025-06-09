ALTER TABLE "user_specific_meetings" ADD COLUMN "platform" "meeting_platform_enum";--> statement-breakpoint
ALTER TABLE "user_specific_meetings" ADD COLUMN "url" text NOT NULL;