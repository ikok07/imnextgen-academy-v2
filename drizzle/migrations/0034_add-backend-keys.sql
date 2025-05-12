CREATE TABLE "backend_keys" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"encoded_key" text NOT NULL,
	"expiry_date" integer NOT NULL,
	CONSTRAINT "backend_keys_encoded_key_unique" UNIQUE("encoded_key")
);
