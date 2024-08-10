-- Add countable column to unit of measurement, defaulting to true for all existing data
ALTER TABLE algo_unit_of_measurement ADD COLUMN countable BOOLEAN NOT NULL DEFAULT TRUE;
-- Alter amount column of dish ingredient as it is not requried when using an uncountable unit of measurement
ALTER TABLE algo_dish_ingredient ALTER amount DROP NOT NULL;
