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
