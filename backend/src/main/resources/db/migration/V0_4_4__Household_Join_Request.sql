-- Table for household join requests
CREATE TABLE IF NOT EXISTS algo_household_join_request (
    id            UUID         PRIMARY KEY,
    household_id  UUID         NOT NULL,
    user_id       UUID         NOT NULL     UNIQUE,
    created_at    TIMESTAMP    NOT NULL,
    FOREIGN KEY (household_id) REFERENCES algo_household (id),
    FOREIGN KEY (user_id) REFERENCES algo_user (id)
);
