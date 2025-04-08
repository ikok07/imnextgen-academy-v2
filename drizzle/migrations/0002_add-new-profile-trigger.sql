CREATE TRIGGER after_profile_insert
AFTER INSERT ON profiles
FOR EACH ROW
EXECUTE FUNCTION insert_into_new_profiles();