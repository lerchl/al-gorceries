CREATE TABLE IF NOT EXISTS algo_unit_of_measurement (
    id   UUID         PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS algo_ingredient (
    id   UUID         PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS algo_season (
    id          UUID         PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    begin_day   INTEGER      NOT NULL,
    begin_month INTEGER      NOT NULL,
    end_day     INTEGER      NOT NULL,
    end_month   INTEGER      NOT NULL
);

CREATE TABLE IF NOT EXISTS algo_dish_list (
    id            UUID    PRIMARY KEY,
    year          INTEGER NOT NULL,
    calendar_week INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS algo_dish (
    id        UUID          PRIMARY KEY,
    name      VARCHAR(100)  NOT NULL,
    source    VARCHAR(1000) NOT NULL,
    time      INTEGER       NOT NULL,
    cost      REAL          NOT NULL
);

CREATE TABLE IF NOT EXISTS algo_dish_ingredient (
    id                     UUID PRIMARY KEY,
    dish_id                UUID NOT NULL,
    ingredient_id          UUID NOT NULL,
    unit_of_measurement_id UUID NOT NULL,
    amount                 REAL NOT NULL,
    FOREIGN KEY (dish_id)                REFERENCES algo_dish (id),
    FOREIGN KEY (ingredient_id)          REFERENCES algo_ingredient (id),
    FOREIGN KEY (unit_of_measurement_id) REFERENCES algo_unit_of_measurement (id)
);

CREATE TABLE IF NOT EXISTS algo_dish_season (
    id          UUID PRIMARY KEY,
    dish_id     UUID NOT NULL,
    season_id   UUID NOT NULL,
    FOREIGN KEY (dish_id)   REFERENCES algo_dish (id),
    FOREIGN KEY (season_id) REFERENCES algo_season (id)
);

CREATE TABLE IF NOT EXISTS algo_dish_step (
    id          UUID          PRIMARY KEY,
    dish_id     UUID          NOT NULL,
    description VARCHAR(1000) NOT NULL,
    index       INTEGER       NOT NULL,
    FOREIGN KEY (dish_id) REFERENCES algo_dish (id)
);

CREATE TABLE IF NOT EXISTS algo_dish_list_dish (
    id              UUID    PRIMARY KEY,
    dish_list_id    UUID    NOT NULL,
    dish_id         UUID    NOT NULL,
    selected        BOOLEAN NOT NULL,
    FOREIGN KEY (dish_list_id) REFERENCES algo_dish_list (id),
    FOREIGN KEY (dish_id)      REFERENCES algo_dish (id)
);

CREATE TABLE IF NOT EXISTS algo_user (
    id       UUID          PRIMARY KEY,
    email    VARCHAR(100)  NOT NULL,
    password VARCHAR(1000) NOT NULL,
    admin    BOOLEAN       NOT NULL    DEFAULT FALSE
);
