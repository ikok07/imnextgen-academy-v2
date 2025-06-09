ALTER TABLE "user_calendar_ids" ADD COLUMN "meeting_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "mentor_schedules" ADD CONSTRAINT "mentor_schedules_profile_id_day_of_week_unique" UNIQUE("profile_id","day_of_week");--> statement-breakpoint
ALTER TABLE "user_calendar_ids" ADD CONSTRAINT "user_calendar_ids_profile_id_unique" UNIQUE("profile_id");