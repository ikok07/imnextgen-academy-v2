DO $$ BEGIN
 CREATE TYPE "public"."task_submission_status" AS ENUM('pending', 'approved', 'changes_requested');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task_submissions" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"video_id" text NOT NULL,
	"task_id" text NOT NULL,
	"task_title" text DEFAULT '' NOT NULL,
	"content" text NOT NULL,
	"link" text,
	"status" "task_submission_status" DEFAULT 'pending' NOT NULL,
	"mentor_feedback" text,
	"reviewed_by" text,
	"created_at" integer DEFAULT extract(epoch from now()) NOT NULL,
	"updated_at" integer DEFAULT extract(epoch from now()) NOT NULL,
	"reviewed_at" integer,
	CONSTRAINT "task_submissions_profile_id_video_id_task_id_unique" UNIQUE("profile_id","video_id","task_id")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "task_submissions_status_idx" ON "task_submissions" ("status");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "task_submissions_profile_video_idx" ON "task_submissions" ("profile_id","video_id");
