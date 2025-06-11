ALTER TABLE "user_specific_meetings" ADD COLUMN "title" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_specific_meetings" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user_specific_meetings" ADD COLUMN "access" "meeting_access_enum" DEFAULT 'free' NOT NULL;--> statement-breakpoint
ALTER TABLE "user_specific_meetings" ADD COLUMN "image_url" text NOT NULL;