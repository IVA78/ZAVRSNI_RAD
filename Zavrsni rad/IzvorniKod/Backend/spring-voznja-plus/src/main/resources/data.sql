-- Inserting sample data into the users table
INSERT INTO users (role, firstname, lastname, dateofbirth, email, password, phonenumber)
VALUES
    ('kandidat', 'Ivana', 'Horvat', '1995-05-15', 'ivana.horvat@example.com', '$2a$10$8xqRL2JYsaoJ2DIRMPwc/OKz7n68U3zQYrnZ/0PzByD823nO0LZJK', '123456789'),
    ('kandidat', 'Ana', 'Kovačić', '1990-08-20', 'ana.kovacic@example.com', '$2a$10$8xqRL2JYsaoJ2DIRMPwc/OKz7n68U3zQYrnZ/0PzByD823nO0LZJK', '987654321'),
    ('kandidat', 'Marko', 'Novak', '1988-03-10', 'marko.novak@example.com', '$2a$10$8xqRL2JYsaoJ2DIRMPwc/OKz7n68U3zQYrnZ/0PzByD823nO0LZJK', '555555555'),
    ('kandidat', 'Petra', 'Radić', '1992-11-05', 'petra.radic@example.com', '$2a$10$8xqRL2JYsaoJ2DIRMPwc/OKz7n68U3zQYrnZ/0PzByD823nO0LZJK', '123123123'),
    ('kandidat', 'Luka', 'Babić', '1985-09-30', 'luka.babic@example.com', '$2a$10$8xqRL2JYsaoJ2DIRMPwc/OKz7n68U3zQYrnZ/0PzByD823nO0LZJK', '456456456'),
    ('kandidat', 'Iva', 'Svalina', '2002-08-23', 'iva.svalina@example.com', '$2a$10$8xqRL2JYsaoJ2DIRMPwc/OKz7n68U3zQYrnZ/0PzByD823nO0LZJK', '654654654'),

    ('instruktor', 'Katarina', 'Jurić', '1970-12-12', 'katarina.juric@example.com', '$2a$10$8xqRL2JYsaoJ2DIRMPwc/OKz7n68U3zQYrnZ/0PzByD823nO0LZJK', '654654654'),
    ('instruktor', 'Ivan', 'Matić', '1975-02-15', 'ivan.matic@example.com', '$2a$10$8xqRL2JYsaoJ2DIRMPwc/OKz7n68U3zQYrnZ/0PzByD823nO0LZJK', '789789789'),
    ('instruktor', 'Nikola', 'Kralj', '1980-10-25', 'nikola.kralj@example.com', '$2a$10$8xqRL2JYsaoJ2DIRMPwc/OKz7n68U3zQYrnZ/0PzByD823nO0LZJK', '147147147'),

    ('administrator', 'Admin', 'User', '1970-01-01', 'admin@example.com', '$2a$10$8xqRL2JYsaoJ2DIRMPwc/OKz7n68U3zQYrnZ/0PzByD823nO0LZJK', '555555555');

-- Insert into the note table using the IDs from the users table
INSERT INTO note (content, user_id)
VALUES
    ('Note for Ivana Horvat', (SELECT id FROM users WHERE email = 'ivana.horvat@example.com')),
    ('Note for Ana Kovačić', (SELECT id FROM users WHERE email = 'ana.kovacic@example.com')),
    ('Note for Marko Novak', (SELECT id FROM users WHERE email = 'marko.novak@example.com')),
    ('Note for Petra Radić', (SELECT id FROM users WHERE email = 'petra.radic@example.com')),
    ('Note for Luka Babić', (SELECT id FROM users WHERE email = 'luka.babic@example.com')),
    ('Note for Iva Svalina', (SELECT id FROM users WHERE email = 'iva.svalina@example.com')),
    ('Note for Katarina Jurić', (SELECT id FROM users WHERE email = 'katarina.juric@example.com')),
    ('Note for Ivan Matić', (SELECT id FROM users WHERE email = 'ivan.matic@example.com')),
    ('Note for Nikola Kralj', (SELECT id FROM users WHERE email = 'nikola.kralj@example.com')),
    ('Note for Admin User', (SELECT id FROM users WHERE email = 'admin@example.com'));

-- Inserting sample data into the driving_hours table using the verified user IDs
INSERT INTO driving_hours (field, date, status, note, user_id)
VALUES
    ('V', '2024-01-01', 'USPJEH', 'First driving lesson on the practice ground', (SELECT id FROM users WHERE email = 'ivana.horvat@example.com')),
    ('C', '2024-01-02', 'NEUSPJEH', 'Driving test on the road', (SELECT id FROM users WHERE email = 'ana.kovacic@example.com')),
    ('V', '2024-01-03', 'DODATNO_VJEZBATI', 'Second driving lesson on the practice ground', (SELECT id FROM users WHERE email = 'marko.novak@example.com')),
    ('C', '2024-01-04', 'USPJEH', 'Road driving practice', (SELECT id FROM users WHERE email = 'petra.radic@example.com')),
    ('V', '2024-01-05', 'USPJEH', 'Third driving lesson on the practice ground', (SELECT id FROM users WHERE email = 'luka.babic@example.com')),
    ('C', '2024-01-06', 'NEUSPJEH', 'Second driving test on the road', (SELECT id FROM users WHERE email = 'iva.svalina@example.com')),
    ('V', '2024-01-07', 'USPJEH', 'Fourth driving lesson on the practice ground', (SELECT id FROM users WHERE email = 'iva.svalina@example.com')),
    ('C', '2024-01-08', 'USPJEH', 'Road driving practice session', (SELECT id FROM users WHERE email = 'iva.svalina@example.com')),
    ('V', '2024-01-09', 'DODATNO_VJEZBATI', 'Fifth driving lesson on the practice ground', (SELECT id FROM users WHERE email = 'iva.svalina@example.com')),
    ('C', '2024-01-10', 'USPJEH', 'Final road driving practice', (SELECT id FROM users WHERE email = 'iva.svalina@example.com'));

-- Inserting additional sample data into the driving_hours table for user 'iva.svalina@example.com'
INSERT INTO driving_hours (field, date, status, note, user_id)
VALUES
    ('V', '2024-02-01', 'USPJEH', 'Second driving lesson on the practice ground', (SELECT id FROM users WHERE email = 'iva.svalina@example.com')),
    ('C', '2024-02-02', 'NEUSPJEH', 'First road driving test', (SELECT id FROM users WHERE email = 'iva.svalina@example.com')),
    ('V', '2024-02-03', 'DODATNO_VJEZBATI', 'Third driving lesson on the practice ground', (SELECT id FROM users WHERE email = 'iva.svalina@example.com')),
    ('C', '2024-02-04', 'USPJEH', 'Second road driving test', (SELECT id FROM users WHERE email = 'iva.svalina@example.com')),
    ('V', '2024-02-05', 'USPJEH', 'Fourth driving lesson on the practice ground', (SELECT id FROM users WHERE email = 'iva.svalina@example.com')),
    ('C', '2024-02-06', 'USPJEH', 'Third road driving test', (SELECT id FROM users WHERE email = 'iva.svalina@example.com')),
    ('V', '2024-02-07', 'USPJEH', 'Fifth driving lesson on the practice ground', (SELECT id FROM users WHERE email = 'iva.svalina@example.com')),
    ('C', '2024-02-08', 'USPJEH', 'Final road driving test', (SELECT id FROM users WHERE email = 'iva.svalina@example.com'));

-- Inserting sample data into the calendar_events table
INSERT INTO calendar_events (title, start_time, end_time, student_id, instructor_id)
VALUES
    ('Termin 1', '2024-06-05T10:00:00Z', '2024-06-05T12:00:00Z', (SELECT id FROM users WHERE email = 'iva.svalina@example.com'), NULL),
    ('Termin 2', '2024-06-06T08:00:00Z', '2024-06-06T10:00:00Z', (SELECT id FROM users WHERE email = 'iva.svalina@example.com'), NULL),
    ('Termin 3', '2024-06-07T14:00:00Z', '2024-06-07T16:00:00Z', (SELECT id FROM users WHERE email = 'iva.svalina@example.com'), NULL),
    ('Termin 4', '2024-06-08T11:00:00Z', '2024-06-08T13:00:00Z', (SELECT id FROM users WHERE email = 'iva.svalina@example.com'), NULL),
    ('Termin 5', '2024-06-09T09:00:00Z', '2024-06-09T11:00:00Z', (SELECT id FROM users WHERE email = 'iva.svalina@example.com'), NULL);

--Inserting sample data into images

-- Inserting images for each user in the system with empty path
INSERT INTO image (user_id, path, type)
VALUES
    ((SELECT id FROM users WHERE email = 'ivana.horvat@example.com'), 'http://res.cloudinary.com/drfgbuw11/image/upload/v1717935845/ivana.png.png', 'image'),
    ((SELECT id FROM users WHERE email = 'ana.kovacic@example.com'), 'http://res.cloudinary.com/drfgbuw11/image/upload/v1717935918/ana.png.png', 'image'),
    ((SELECT id FROM users WHERE email = 'marko.novak@example.com'), 'http://res.cloudinary.com/drfgbuw11/image/upload/v1717935982/marko.png.png', 'image'),
    ((SELECT id FROM users WHERE email = 'petra.radic@example.com'), 'http://res.cloudinary.com/drfgbuw11/image/upload/v1717936039/petra.png.png', 'image'),
    ((SELECT id FROM users WHERE email = 'luka.babic@example.com'), 'http://res.cloudinary.com/drfgbuw11/image/upload/v1717936103/luka.png.png', 'image'),
    ((SELECT id FROM users WHERE email = 'iva.svalina@example.com'), 'http://res.cloudinary.com/drfgbuw11/image/upload/v1717936510/me.jpg.jpg', 'image'),
    ((SELECT id FROM users WHERE email = 'katarina.juric@example.com'), 'http://res.cloudinary.com/drfgbuw11/image/upload/v1717936150/katarina.png.png', 'image'),
    ((SELECT id FROM users WHERE email = 'ivan.matic@example.com'), 'http://res.cloudinary.com/drfgbuw11/image/upload/v1717936214/ivan.png.png', 'image'),
    ((SELECT id FROM users WHERE email = 'nikola.kralj@example.com'), 'http://res.cloudinary.com/drfgbuw11/image/upload/v1717936246/nikola.png.png', 'image'),
    ((SELECT id FROM users WHERE email = 'admin@example.com'), 'http://res.cloudinary.com/drfgbuw11/image/upload/v1717936275/admin.png.png', 'image');




