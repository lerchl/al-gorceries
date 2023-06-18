-- Columns for a dish for the amount of servings
ALTER TABLE algo_dish ADD COLUMN serving_unit_of_measurement_id UUID NOT NULL;
ALTER TABLE algo_dish ADD COLUMN serving_amount REAL NOT NULL;

ALTER TABLE algo_dish ADD FOREIGN KEY (serving_unit_of_measurement_id) REFERENCES algo_unit_of_measurement (id);
