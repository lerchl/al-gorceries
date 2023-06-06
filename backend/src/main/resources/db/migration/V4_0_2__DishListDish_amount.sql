-- Column for a dish list dish to adjust the amount of servings
ALTER TABLE algo_dish_list_dish DROP COLUMN selected;
ALTER TABLE algo_dish_list_dish ADD COLUMN amount INTEGER NOT NULL;
