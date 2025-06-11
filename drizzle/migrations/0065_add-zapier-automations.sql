CREATE TABLE "zapier_automations" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"url" text NOT NULL
);
