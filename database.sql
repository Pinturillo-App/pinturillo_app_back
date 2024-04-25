CREATE TABLE Word (
    id SERIAL PRIMARY KEY,
    text VARCHAR(50) NOT NULL
);

CREATE TABLE Category (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL
);

CREATE TABLE Room (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    state VARCHAR(20),
    id_category INT,
    FOREIGN KEY (id_category) REFERENCES Category(id)
);

CREATE TABLE WordCategory (
    id SERIAL PRIMARY KEY,
    id_word INT,
    id_category INT,
    FOREIGN KEY (id_word) REFERENCES Word(id),
    FOREIGN KEY (id_category) REFERENCES Category(id),
);