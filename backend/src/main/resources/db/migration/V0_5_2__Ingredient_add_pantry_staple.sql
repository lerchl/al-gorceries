-- Add pantry staple to ingredient, defaulting to false for all existing data
ALTER TABLE algo_ingredient ADD COLUMN pantry_staple BOOLEAN NOT NULL DEFAULT FALSE;
