CREATE TABLE "video_progresses" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"video_id" text NOT NULL,
	"progress_percentage" integer NOT NULL,
	CONSTRAINT "video_progresses_profile_id_video_id_unique" UNIQUE("profile_id","video_id")
);
--> statement-breakpoint
ALTER TABLE "video_progresses" ADD CONSTRAINT "video_progresses_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "video_progresses" ADD CONSTRAINT "video_progresses_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE cascade;