CREATE TABLE "setup_questions" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question" text NOT NULL,
	"is_multiline" boolean DEFAULT false NOT NULL,
	"required" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_setup_questions" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"question_id" text NOT NULL,
	"answer" text
);
--> statement-breakpoint
ALTER TABLE "user_setup_questions" ADD CONSTRAINT "user_setup_questions_question_id_setup_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."setup_questions"("id") ON DELETE cascade ON UPDATE cascade;