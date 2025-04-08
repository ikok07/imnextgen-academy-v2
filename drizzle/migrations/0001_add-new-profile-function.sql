CREATE OR REPLACE FUNCTION insert_into_new_profiles()
    RETURNS TRIGGER AS $$
BEGIN
INSERT INTO new_profiles (profile_id)
VALUES (NEW.id);
RETURN NEW;
END;
$$ LANGUAGE plpgsql;