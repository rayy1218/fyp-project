$(document).ready(() => {
    function getWatchedHistory() {
        $.ajax(
            //join ticket, scheduled_movie, movie and return movie_id, movie_title, movie_thumbnail where ticket_status = "used"
            "/src/api/dashboard.php?action=watched-history",
            {
                success: (response) => {
                    print(response);
                    if (response.length === 0) {
                        $("#watched-history-placeholder").html("<div class='fs-2 my-5 text-center'>No Watched Movie</div>")
                    }
                },
            }
        );

        function print(result) {
            let first = true, appending = "", i = 0;
            while (i < result.length) {
                appending += `
              <div class="carousel-item ${(first) ? " active" : ""}">
                <div class="row p-2">
            `;

                for (let j = 1; j <= 3; j += 1) {
                    if (i >= result.length) {break;}
                    const row = result[i];
                    appending += `
                  <div class="col-lg-4 mb-2">
                    <div class="card">
                      <img src="${row.movie_thumbnail}" class="card-img-top img-thumbnail m-auto" alt="movie-thumbnail"/>
                      <div class="card-body d-flex align-items-end justify-content-center">
                        <div class="w-100">
                          <h6 class="card-title text-center text-light">${row.movie_title}</h6>
                          <div class="row m-auto">
                            <div class="col-6"><a href="/src/movie-detail.html?movie-id=${row.movie_id}" class="btn btn-outline-light w-100">Detail</a></div>
                            <div class="col-6"><a href="/src/ticket-purchase.html?movie-id=${row.movie_id}" class="btn btn-outline-light w-100">Book</a></div>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                `;
                    i += 1;
                }

                appending += `
                </div>
              </div>
            `;
                first = false;
            }
            $("#watched-history-placeholder").html(appending);
        }
    }

    function getPurchasedTicket() {
        $.ajax(
            //join ticket, scheduled_movie, movie and return ticket_id, movie_id, movie_title, movie_thumbnail where ticket_status = paid and scheduled_movie_showing_date >= today
            "/src/api/dashboard.php?action=purchased-ticket",
            {
                success: (response) => {
                    print(response);
                    if (response.length === 0) {
                        $("#purchased-ticket-placeholder").html("<div class='fs-2 my-5 text-center'>No Purchased Ticket</div>")
                    }
                }
            }
        );

        function print(result) {
            let first = true, appending = "", i = 0;
            while (i < result.length) {
                appending += `
              <div class="carousel-item ${(first) ? " active" : ""}">
                <div class="row p-2">
            `;

                for (let j = 1; j <= 3; j += 1) {
                    if (i >= result.length) {break;}
                    const row = result[i];
                    appending += `
                  <div class="col-lg-4 mb-2">
                    <div class="card">
                      <img src="${row.movie_thumbnail}" class="card-img-top img-thumbnail m-auto" alt="movie-thumbnail"/>
                      <div class="card-body d-flex align-items-end justify-content-center">
                        <div class="w-100">
                          <h6 class="card-title text-center text-light">${row.movie_title}</h6>
                          <div class="row m-auto">
                            <div class="col-6"><a href="/src/movie-detail.html?movie-id=${row.movie_id}" class="btn btn-outline-light w-100">Detail</a></div>
                            <div class="col-6"><a href="/src/receipt.html?ticket-id=${row.ticket_id}" class="btn btn-outline-light w-100">Receipt</a></div>
                          </div>
                          
                        </div>
                        
                      </div>
                    </div>
                  </div>
                `;
                    i += 1;
                }

                appending += `
                </div>
              </div>
            `;
                first = false;
            }
            $("#purchased-ticket-placeholder").html(appending);
        }
    }

    function getUsername() {
        $.ajax(
            "/src/api/dashboard.php",
            {
                data: {
                    action: "get-username"
                },
                success: (response) => {
                    print(response)
                }
            }
        )

        function print(response) {
            $("#username-placeholder").html(response["username"])
        }
    }

    function getMonthCount() {
        $.ajax(
            "/src/api/dashboard.php",
            {
                data: {
                    action: "get-month-count"
                },
                success: (response) => {
                    print(response)
                }
            }
        )

        function print(response) {
            $("#movie-month-count").html(response["month"])
        }
    }

    function getTotalCount() {
        $.ajax(
            "/src/api/dashboard.php",
            {
                data: {
                    action: "get-total-count"
                },
                success: (response) => {
                    print(response)
                }
            }
        )

        function print(response) {
            $("#movie-total-count").html(response["total"])
        }
    }

    getWatchedHistory()
    getPurchasedTicket()
    getUsername()
    getMonthCount()
    getTotalCount()
});