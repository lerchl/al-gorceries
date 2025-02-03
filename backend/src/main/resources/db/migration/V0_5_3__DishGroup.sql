-- Create table for dish groups and table to connect m to n relation to dish
CREATE TABLE IF NOT EXISTS algo_dish_group (
	id           UUID         PRIMARY KEY,
	name         VARCHAR(100) NOT NULL,
	household_id UUID         NOT NULL,
	FOREIGN KEY (household_id) REFERENCES algo_household (id)
);

CREATE TABLE IF NOT EXISTS algo_dish_group_dish (
	dish_group_id UUID        NOT NULL,
	dish_id       UUID        NOT NULL,
	PRIMARY KEY (dish_group_id, dish_id),
	FOREIGN KEY (dish_group_id) REFERENCES algo_dish_group (id),
	FOREIGN KEY (dish_id) REFERENCES algo_dish (id)
);
