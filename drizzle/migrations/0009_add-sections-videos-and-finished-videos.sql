CREATE TABLE "finished_videos" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"video_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sections" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"module_id" text,
	"title" text NOT NULL,
	"order_number" integer NOT NULL,
	CONSTRAINT "order_number_check" CHECK ("sections"."order_number" > -1)
);
--> statement-breakpoint
CREATE TABLE "videos" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"section_id" text,
	"title" text NOT NULL,
	"order_number" integer NOT NULL,
	CONSTRAINT "order_number_check" CHECK ("videos"."order_number" > -1)
);
--> statement-breakpoint
ALTER TABLE "finished_videos" ADD CONSTRAINT "finished_videos_profile_id_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "finished_videos" ADD CONSTRAINT "finished_videos_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "sections" ADD CONSTRAINT "sections_module_id_modules_id_fk" FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_section_id_sections_id_fk" FOREIGN KEY ("section_id") REFERENCES "public"."sections"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "modules" ADD CONSTRAINT "order_number_check" CHECK ("modules"."order_number" > -1);