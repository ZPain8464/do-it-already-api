BEGIN;

INSERT INTO categories (category, id)
VALUES 
('productivity', 1),
('fitness', 2),
('finance', 3),
('travel', 4);

INSERT INTO todos (id, category, title, description, start_date, completed_date, checked, category_id)
VALUES 
(1, 'productivity', 'Get productive', 'Read LOTR trilogy', '2020-01-03T00:00:00.000Z', '2020-04-03T00:00:00.000Z', 'false', 1),
(2, 'fitness', 'Get fit', 'Run first half marathon', '2020-01-03T00:00:00.000Z', '2020-04-03T00:00:00.000Z', 'false', 2),
(4, 'travel', 'Get traveling', 'Visit friends in Taiwan', '2020-01-03T00:00:00.000Z', '2022-05-03T00:00:00.000Z', 'true', 4);

COMMIT;