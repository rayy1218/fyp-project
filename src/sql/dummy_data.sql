DELETE FROM Member WHERE NOT member_id = 1;
INSERT INTO Member (member_first_name, member_last_name, member_email, member_password, member_phone, member_birthday)
VALUES
(
    'Second',
    'User',
    'second_user@gmail.com',
    '1234',
    '012-3456789',
    '2000-01-01'
),
(
    'Third',
    'User',
    'third_user@gmail.com',
    '1234',
    '012-9876543',
    '2001-01-01'
);

INSERT INTO Movies (movie_title, movie_duration, movie_description, movie_thumbnail, movie_genre, movie_language, movie_censorship_rating, movie_rating)
VALUES
(
    'bla1',
    '1234',
    'bla1',
    'bla1',
    'bla1',
    'bla1',
    'bla1',
    'bla1',
),
(
    'bla2',
    '12345',
    'bla2',
    'bla2',
    'bla2',
    'bla2',
    'bla2',
    'bla2',
);

