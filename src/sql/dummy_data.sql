DELETE FROM Member WHERE NOT member_id = 1;
INSERT INTO Member (member_username, member_email, member_password, member_phone, member_birthday)
VALUES
(
    'user',
    'second_user@gmail.com',
    '1234',
    '012-3456789',
    '2000-01-01'
),
(
    'Third User',
    'third_user@gmail.com',
    '1234',
    '012-9876543',
    '2001-01-01'
);

INSERT INTO Cinema (cinema_address, cinema_status)
VALUES ('First Cinema', 'on');

INSERT INTO Theater (cinema_id, theater_name, theater_status)
VALUES
    (1, 'Theater 1', 'on'),
    (1, 'Theater 2', 'on')
;

