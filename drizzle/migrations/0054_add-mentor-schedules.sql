CREATE TABLE "mentor_schedules" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"profile_id" text NOT NULL,
	"day_of_week" integer NOT NULL,
	"start_hour" integer NOT NULL,
	"start_minutes" integer NOT NULL,
	"duration" integer NOT NULL
);
