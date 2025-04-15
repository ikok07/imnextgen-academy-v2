CREATE TYPE "public"."video_resource_type" AS ENUM('image', 'file');--> statement-breakpoint
CREATE TABLE "video_descriptions" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"markdown" text
);
--> statement-breakpoint
CREATE TABLE "video_resources" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"label" text NOT NULL,
	"type" "video_resource_type" DEFAULT 'file' NOT NULL,
	"url" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "url" text;--> statement-breakpoint
ALTER TABLE "videos" ADD COLUMN "description_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "videos" ADD CONSTRAINT "videos_description_id_video_descriptions_id_fk" FOREIGN KEY ("description_id") REFERENCES "public"."video_descriptions"("id") ON DELETE no action ON UPDATE no action;