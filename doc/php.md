# To setup the Backend side

1. Check the script file at the Frontend side first,

    Example: [movie-list.js](https://github.com/rayy1218/fyp-project/blob/main/src/script/movie-list.js)

    ```javascript
    //movie-list.js
    
    $(document).ready(() => {
        function getMovieList() {
            $.ajax(
                //HERE IS THE PHP LINK THE SITE WILL REQUEST TO
                "./api/movie-list.php",
                {
                    success: (response) => {
                        let result = JSON.parse(response);
                        print(result)
                    },
    
                    error: () => {
    
                    },
                }
            );
    
            function print(result) {
                let append = "";
                for (let row of result) {
                    append += `
                        <div class="card m-2">
                          <img src="${row.movie_thumbnail}" class="card-img-top" alt="movie-thumbnail"/>
                          <div class="card-body">
                            <h6 class="card-title">${row.movie_title}</h6>
                            <div class="row">
                              <a href="./movie-detail.html?movie-id=${row.movie_id}" class="btn btn-outline-primary col">Detail</a>
                              <a href="./ticket-purchase.html?movie-id=${row.movie_id}" class="btn btn-outline-secondary col">Book</a>
                            </div>
                          </div>
                        </div>
                      `;
                }
    
                $("#movie-list-placeholder").html(append);
            }
        }
    
        getMovieList();
    });
    ```
    Inside the $.ajax function, an URL is there. When the site was loaded/ready, the script will send a request to the php file


2. A php file should be created according to the URL above. The php should echo/print the data in JSON 
   Example: [movie-list.php](https://github.com/rayy1218/fyp-project/blob/main/src/api/movie-list.php)
    ```php
    <?php
    include "connection.php";
    
    # connection.php
    <?php
    $host="localhost";
    $user="root";
    $password="";
    $dbname="movie-site";
    
    $conn = mysqli_connect($host,$user,$password,$dbname);
    
    // Check connection
    if (mysqli_connect_errno()) {
    echo "Failed to connect to MySQL: " . mysqli_connect_error();
    exit();
    }
    
    # Query the db and get the result
    $query_result = mysqli_query($conn, "SELECT movie_id, movie_title, movie_thumbnail FROM movie");
    $rows = array();
   
    # Loop though the result rows
    while($row = mysqli_fetch_assoc($query_result)) {
        # Push the result row into the array
        $rows[] = $row;
    }
    
    # Encode the result into JSON and echo/print it into the page
    # which will return to the script to use
    echo json_encode($rows);
    ```
   
