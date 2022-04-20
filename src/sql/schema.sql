CREATE TABLE IF NOT EXISTS Member (
    member_id INT NOT NULL AUTO_INCREMENT,
    member_username VARCHAR(30) NOT NULL,
    member_email VARCHAR(30) NOT NULL,
    member_password VARCHAR(30) NOT NULL,
    member_phone VARCHAR(30) NOT NULL,
    member_birthday DATE,
    member_reset_password_token VARCHAR(16),
    member_verify_token VARCHAR(16),
    PRIMARY KEY (member_id),
    UNIQUE (member_id)
);

CREATE TABLE IF NOT EXISTS Employee (
    employee_id INT NOT NULL AUTO_INCREMENT,
    member_id INT NOT NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (member_id) REFERENCES Member(member_id)
);

CREATE TABLE IF NOT EXISTS Movie (
    movie_id INT NOT NULL AUTO_INCREMENT,
    movie_title VARCHAR(100) NOT NULL,
    movie_thumbnail VARCHAR(100) NOT NULL,
    movie_duration INT NOT NULL,
    movie_description VARCHAR(1000),
    movie_genre VARCHAR(30),
    movie_language VARCHAR(30),
    movie_censorship_rating VARCHAR(30),
    movie_rating VARCHAR(30),
    PRIMARY KEY (movie_id),
    UNIQUE (movie_id)
);


CREATE TABLE IF NOT EXISTS Cinema (
    cinema_id INT NOT NULL AUTO_INCREMENT,
    cinema_address VARCHAR(100) NOT NULL,
    cinema_status VARCHAR(30) NOT NULL,
    PRIMARY KEY (cinema_id)
);

CREATE TABLE IF NOT EXISTS Theater (
    theater_id INT NOT NULL AUTO_INCREMENT,
    cinema_id INT NOT NULL,
    theater_name VARCHAR(30) NOT NULL,
    theater_status VARCHAR(30) NOT NULL,
    PRIMARY KEY (theater_id),
    FOREIGN KEY (cinema_id) REFERENCES Cinema(cinema_id)
);

CREATE TABLE IF NOT EXISTS Scheduled_Movie (
    scheduled_movie_id INT NOT NULL AUTO_INCREMENT,
    theater_id INT NOT NULL,
    movie_id INT NOT NULL,
    employee_id INT NOT NULL,
    scheduled_movie_showing_date DATE NOT NULL,
    scheduled_movie_start_time TIME NOT NULL,
    scheduled_movie_price DECIMAL(4, 2) NOT NULL DEFAULT 5,
    PRIMARY KEY (scheduled_movie_id),
    FOREIGN KEY (theater_id) REFERENCES Theater(theater_id),
    FOREIGN KEY (movie_id) REFERENCES Movie(movie_id),
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id)
);

CREATE TABLE IF NOT EXISTS Ticket (
    ticket_id INT NOT NULL AUTO_INCREMENT,
    scheduled_movie_id INT NOT NULL,
    member_id INT NOT NULL,
    ticket_made_date DATE NOT NULL,
    ticket_made_time TIME NOT NULL,
    ticket_payment_amount FLOAT NOT NULL,
    ticket_adult_num INT NOT NULL,
    ticket_child_elder_num INT NOT NULL,
    ticket_student_num INT NOT NULL,
    ticket_token VARCHAR(16),
    ticket_status VARCHAR(30) NOT NULL,
    PRIMARY KEY (ticket_id),
    FOREIGN KEY (scheduled_movie_id) REFERENCES Scheduled_Movie(scheduled_movie_id),
    FOREIGN KEY (member_id) REFERENCES Member(member_id)
);

CREATE TABLE IF NOT EXISTS Seat (
    seat_id INT NOT NULL AUTO_INCREMENT,
    scheduled_movie_id INT NOT NULL,
    ticket_id INT,
    seat_row INT NOT NULL,
    seat_column INT NOT NULL,
    PRIMARY KEY (seat_id),
    FOREIGN KEY (scheduled_movie_id) REFERENCES Scheduled_Movie(scheduled_movie_id),
    FOREIGN KEY (ticket_id) REFERENCES Ticket(ticket_id)
);