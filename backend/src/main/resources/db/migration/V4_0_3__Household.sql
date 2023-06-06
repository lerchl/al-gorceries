-- Table for households
CREATE TABLE IF NOT EXISTS algo_household (
    id   UUID         PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- Column in user for household
ALTER TABLE algo_user ADD COLUMN household_id UUID;
ALTER TABLE algo_user ADD FOREIGN KEY (household_id) REFERENCES algo_household (id);
