-- Изпълни ЕДНОКРАТНО с потребител neondb_owner (Neon SQL Editor).
-- Приложението работи и без тези външни ключове; те добавят каскадното триене,
-- когато профил, видео или урок бъдат изтрити.
-- Потребителят vercel-production от DATABASE_URL няма право REFERENCES върху
-- таблиците на neondb_owner, затова ключовете не влизат в миграцията.

ALTER TABLE "task_submissions"
    ADD CONSTRAINT "task_submissions_profile_id_profiles_id_fk"
    FOREIGN KEY ("profile_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE cascade;

ALTER TABLE "task_submissions"
    ADD CONSTRAINT "task_submissions_video_id_videos_id_fk"
    FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE cascade;

ALTER TABLE "task_submissions"
    ADD CONSTRAINT "task_submissions_reviewed_by_profiles_id_fk"
    FOREIGN KEY ("reviewed_by") REFERENCES "public"."profiles"("id") ON DELETE set null ON UPDATE cascade;
