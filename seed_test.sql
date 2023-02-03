DROP DATABASE jestsession2_test ;
CREATE DATABASE jestsession2_test ;
\connect jestsession2_test

CREATE TABLE jest_users (
    user_id SERIAL PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    password TEXT NOT NULL CHECK (password <> ''),
    date_created TIMESTAMP DEFAULT NOW()
);
INSERT INTO jest_users (first_name, last_name, email, password)
VALUES  ('redman', 'joseph', 'redman@gmail.com', '777'),
        ('kehe', 'joseph', 'kehe@gmail.com', '777');


CREATE TABLE jobs (
    job_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    salary NUMERIC(6,2) CHECK (salary >= 0)
);
INSERT INTO jobs(title, company, salary)
VALUES  ('frontend-developer', 'google', 400.00),
        ('backend-developer', 'google', 333.00),
        ('taximan', 'hbg', 600.00);