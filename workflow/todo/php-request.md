### For you information
1. By return, it means echo
2. Before echo convert the object or array to json datatype
3. data = "movie_id" mean that movie_id is sent as data and can be access by $_GET or $_POST based on the method 
4. To put a single value to an object
  ```php
    $object = new stdClass();
    $object->property = 'value';
  ```
5. To convert an object or array to json datatype
  ```php
    $json = json_encode($object_or_array);
  ```
6. TO convert the query result to json datatype just convert it to array first
  ```php
      # Get query result
      $query_result = mysqli_query($conn, $statement);
      
      # Initial the array
      $rows = array();
      while($row = mysqli_fetch_assoc($query_result)) {
          # Push the result row into the array
          $rows[] = $row;
      }
      
      # Echo it into the page for return
      echo json_encode($row);
  ```

### Request of php

- homepage.php (homepage.js)
  - action="promoted-movie" GET
    - TBD
  - action="recent-movie" GET
    - return array[9] of object["movie_thumbnail, movie_id, movie_title"] sort by movie_added_time
  - action="movie-today" GET
    - return array[9] of object["movie_thumbnail, movie_id, movie_title"] from scheduled movie where movie_showing_date = today


- login.php (login.js header.js)
  - action="login" POST
    - data = "username" "password"
    - query Member
      - return object["status" = "username_failure"] if not found
      - return object["status" = "password_failure"] if found but password not matched
      - else return object["status" = "success"]
        - before return, start session and set session["username"] & session["password"]
  - action="register" POST
    - data(POST) = "username" "email" "password" "re_password" "phone_num"
    - query Member
      - return object["status" = "password_format_error"] if password isn't match the character and length limitation
      - return object["status" = "re_password_error"] if password didn't match re-password
      - return object["status" = "username_error"] if same username found
      - else return object["status" = "success"]
  - action="get-user-status" GET
    - object["status" = "guest"] if session["username"] & session["password"] not set
    - object["status" = "member"] if session["username"] & session["password"] set and match but 
    the member_id not in employee.member_id
    - object["status" = "employee"] if "member" if session["username"] && session["password"] set and match 
      also the member_id found the same in employee.member_id
  - action="logout" POST
    - unset session["username"] & session["password"]
    - destroy session


- ticket-purchase.php (query-scheduled-movie.js seat-selecting.js) 
  - action="get-cinema-list" GET
    - data = "movie_id"
    - query scheduled_movie with same movie_id && same scheduled-movie-showing-date >= today &&
      scheduled_movie_starting_time > now and return array of object["cinema_id, cinema_name"]
  - action="get-date-list" GET
    - data = "movie_id" "cinema_id"
    - query scheduled_movie with same movie_id && same cinema_id && scheduled-movie-showing-date >= today and
      return array of object["scheduled_movie_showing_date"]
  - action="get-time-list" GET
    - data = "movie_id" "scheduled_movie_showing_date"
    - query scheduled_movie with same movie_id && same cinema_id && same scheduled-movie-showing-date  &&
      scheduled_movie_starting_time > now and return array of object["scheduled_movie_showing_time"]
  - action="get-scheduled-movie" GET
    - data = "movie_id" "scheduled_movie_showing_date" "scheduled_movie_showing_time"
    - query scheduled_movie with same movie_id && same cinema_id && same scheduled-movie-showing-date &&
      same scheduled_movie_starting_time and return object["scheduled_movie_id"]
  - action="get-seat" GET
    - data = "scheduled_movie_id" 
    - query seat with same scheduled_movie_id sort by seat_row then seat_col 
      and return array of object["seat_id, ticket_id"]

- payment.php (payment.js)
  - action="get-summary" GET
    - data = "scheduled_movie_id" "seat-id[]" "adult_num" "child_elder_num" "student_num"
    - name the seat, calculate the payment amount and query the movie_title
    - return object["movie_title, seat_str, adult_num, child_elder_num, student_num, ticket_payment_amount"]
  - action="set-ticket" POST
    - data = "scheduled_movie_id" "seat-id[]" "adult_num" "child_elder_num" "student_num"
    - calculate the payment
    - insert into ticket(ticket_status="unpaid")
    - update seat.ticket_id to the ticket_id create just now with same scheduled_movie_id
    - return object["ticket_id"]

- receipt.php (receipt.js)
  - action="get-receipt" GET
    - data = "ticket_id"
    - return object["member_name, ticket_payment_amount, movie_name, movie_censorship_rating, cinema_address, 
      theater_name, scheduled_movie_showing_date, scheduled_movie_start_time, ticket_adult_num, ticket_child_elder_num, ticket_student_num, ticket_token"]
  - action="send-email" GET
    - data = "ticket_id"
    - query the member_email and send the email with html of receipt


- cinema-theater.php (schedule-employee.js cinema-theater.js)
  - action="get-cinema-list" GET
    - query all movie and return array of object["cinema_address, cinema_id"]
  - action="get-theater-list" GET
    - data = "cinema_id"
    - query all theater with same Theater.cinema_id and return array of object["theater_id, theater_name"]
  - action="add-cinema" POST
    - data = "cinema_address"
    - insert into Cinema with cinema_address and cinema_status("open")
  - action="add-theater" POST
    - data = "cinema_id" "theater_name"
    - insert into Theater with cinema_id and theater_name and theater_status("open")


- schedule-employee.php (schedule-employee.js)
  - action="get-scheduled-movie" GET
    - data = "cinema_id"
    - query all scheduled_movie with same cinema_id
    - return object["scheduled_movie_id, movie_title, scheduled_movie_showing_date, scheduled_movie_showing_date, 
      scheduled_movie_starting_time, movie_duration"]
  - action="add-scheduled-movie" GET

- dashboard.php (dashboard.js)
  - action="watched-history" GET
    - query ticket join scheduled_movie and movie with ticket_status = "watched"
    - return arr[9] of object["movie_id, movie_title, movie_thumbnail"]
  - action="purchased-ticket" GET
    - query ticket join scheduled_movie and movie with ticket_status = "paid"
    - return arr[9] of object["ticket_id, movie_id, movie_title, movie_thumbnail"] 
