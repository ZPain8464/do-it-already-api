BEGIN;

INSERT INTO users (id, username, name, password, date_created)
VALUES
(1, 'demo_user_name', 'John Smith', 'password', '2020-01-03T00:00:00.000Z'),
(2, 'demo_user_name1', 'Alex Smith', 'password1', '2020-01-03T00:00:00.000Z'),
(3, 'demo_user_name2', 'Joe Smith', 'password2', '2020-01-03T00:00:00.000Z');

COMMIT;