-- Create a household for all existing data to be scoped to
INSERT INTO algo_household (id, name) VALUES (gen_random_uuid(), 'PRE V0.4 DATA');

-- Add nullable columns to all tables that need to be scoped to a household
ALTER TABLE algo_dish ADD COLUMN household_id UUID;
ALTER TABLE algo_dish ADD FOREIGN KEY (household_id) REFERENCES algo_household (id);

ALTER TABLE algo_dish_list ADD COLUMN household_id UUID;
ALTER TABLE algo_dish_list ADD FOREIGN KEY (household_id) REFERENCES algo_household (id);

ALTER TABLE algo_ingredient ADD COLUMN household_id UUID;
ALTER TABLE algo_ingredient ADD FOREIGN KEY (household_id) REFERENCES algo_household (id);

ALTER TABLE algo_season ADD COLUMN household_id UUID;
ALTER TABLE algo_season ADD FOREIGN KEY (household_id) REFERENCES algo_household (id);

ALTER TABLE algo_unit_of_measurement ADD COLUMN household_id UUID;
ALTER TABLE algo_unit_of_measurement ADD FOREIGN KEY (household_id) REFERENCES algo_household (id);

-- Set the household_id for all existing data to the household created above
UPDATE algo_dish SET household_id = (SELECT id FROM algo_household WHERE name = 'PRE V0.4 DATA');
UPDATE algo_dish_list SET household_id = (SELECT id FROM algo_household WHERE name = 'PRE V0.4 DATA');
UPDATE algo_ingredient SET household_id = (SELECT id FROM algo_household WHERE name = 'PRE V0.4 DATA');
UPDATE algo_season SET household_id = (SELECT id FROM algo_household WHERE name = 'PRE V0.4 DATA');
UPDATE algo_unit_of_measurement SET household_id = (SELECT id FROM algo_household WHERE name = 'PRE V0.4 DATA');

-- Set the household_id column to not nullable
ALTER TABLE algo_dish ALTER COLUMN household_id SET NOT NULL;
ALTER TABLE algo_dish_list ALTER COLUMN household_id SET NOT NULL;
ALTER TABLE algo_ingredient ALTER COLUMN household_id SET NOT NULL;
ALTER TABLE algo_season ALTER COLUMN household_id SET NOT NULL;
ALTER TABLE algo_unit_of_measurement ALTER COLUMN household_id SET NOT NULL;
