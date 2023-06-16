-- Delete all users (unhashed passwords without salt and pepper)
-- No problem as multiple users are useless anyway
DELETE FROM algo_user;

-- Column for a user to store the salt for the password
ALTER TABLE algo_user ADD COLUMN salt VARCHAR(29) NOT NULL;
