$(document).ready(() => {
    const URLSearch = new URLSearchParams(window.location.search)
    const movie_id = URLSearch.get("movie-id")

    class Card {
        constructor(id, date, time) {
            this.id = id
            this.date = date
            this.time = time
        }

        html() {
            return `
                <a class="card m-3 text-decoration-none text-dark" href="/src/seat-selecting.html?scheduled-movie-id=${this.id}">
                  <div class="card-body">
                    <p>Date: ${this.date}</p>
                    <p>Time: ${this.time}</p>
                  </div>
                </a>
            `
        }
    }

    function getCinemaList() {
        $.ajax(
            "./api/ticket-purchase.php",
            {
                data: {
                    action: "get-cinema-list",
                    "movie-id": movie_id
                },
                success: (response) => {
                    print(response)
                },
            }
        );

        function print(result) {
            let append = `<option value="no-selected" selected>Select Cinema</option>`
            for (let row of result) {
                append += `<option value="${row.cinema_id}">${row.cinema_address}</option>`
            }

            $("#cinema-list-placeholder").html(append)
        }
    }

    function getScheduledMovie() {
        $.ajax(
            "./api/ticket-purchase.php",
            {
                data: {
                    action: "get-scheduled-movie",
                    "movie-id": movie_id,
                    "cinema-id": $("#cinema-list-placeholder").val(),
                },
                success: (response) => {
                    print(response)
                },
            }
        );

        function print(response) {
            let html = ""
            for (let scheduled_movie of response) {
                let card = new Card(
                    scheduled_movie["scheduled_movie_id"], scheduled_movie["scheduled_movie_showing_date"],
                    scheduled_movie["scheduled_movie_start_time"]
                )
                html += card.html()
            }
            $("#scheduled-movie-placeholder").html(html)
        }
    }

    getCinemaList()

    $("#cinema-list-placeholder").change(() => {
        getScheduledMovie()
    })
});