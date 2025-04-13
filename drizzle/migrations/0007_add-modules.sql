CREATE TABLE "modules" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"access" "profile_access" DEFAULT 'free' NOT NULL,
	"order_number" integer NOT NULL
);
