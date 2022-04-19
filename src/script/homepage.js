$(document).ready(() => {
    class HorizonCarouselList {
        constructor(item_list) {
            this.items = [];
            for (let item of item_list) {
                this.items.push(new MovieCard(item));
            }
        }

        html() {
            let first = true, html = "", i = 0;
            while (i < this.items.length) {
                html += `
                  <div class="carousel-item ${(first) ? " active" : ""}">
                   <div class="row p-2">
                `;

                for (let j = 1; j <= 3; j += 1) {
                    if (i >= this.items.length) {break;}
                    html += this.items[i].html();

                    i += 1;
                }

                html += `
                  </div>
                 </div>
                `;
                first = false;
            }

            return html;
        }
    }

    class MovieCard {
        constructor(item) {
            this.movie_id = item.movie_id, this.movie_title = item.movie_title, this.movie_thumbnail = item.movie_thumbnail;
        }

        html() {
            let html = "";
            html += `
              <div class="col-lg-4 mb-2">
                <div class="card h-100">
                  <img src="${this.movie_thumbnail}" class="card-img-top img-thumbnail m-auto p-0 my-3" alt="movie-thumbnail"/>
                  <div class="card-body d-flex align-items-end justify-content-center">
                    <div class="w-100">
                      <h6 class="card-title text-center text-light">${this.movie_title}</h6>
                      <div class="row m-auto">
                        <div class="col-6"><a href="/src/movie-detail.html?movie-id=${this.movie_id}" class="btn btn-outline-light w-100">Detail</a></div>
                        <div class="col-6"><a href="/src/ticket-purchase.html?movie-id=${this.movie_id}" class="btn btn-outline-light w-100">Book</a></div>
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            `;

            return html;
        }
    }

    function getPromotedMovie() {
        $.ajax(
            //return movie with movie_id, movie_thumbnail
            "/src/api/homepage.php?action=promoted-movie",
            {
                success: (response) => {
                    print(response);
                }
            }
        );

        function print(result) {
            let first = true, appending = "";
            for (let row of result) {
                appending += `<div class="carousel-item ${(first) ? "active" : ""}"><a href="./src/movie-detail.html?movie-id=${row.movie_id}"><img src="${row.movie_thumbnail}" class="d-block w-100" alt="promoted-movie"></a></div>`;
                first = false;
            }
            $("#promoted-movie-placeholder").html(appending);
        }
    }

    function getRecentMovie() {
        $.ajax(
            "/src/api/homepage.php?action=recent-movie",
            {
                success: (response) => {
                    printCarousel(response, "recent-movie-placeholder");
                    if (response.length === 0) {
                        $("#recent-movie-placeholder").html("<div class='fs-2 my-5 text-center'>No Recent Movie</div>")
                    }
                }
            }
        );
    }

    function getMovieToday() {
        $.ajax("/src/api/homepage.php?action=movie-today",
            {
                success: (response) => {
                    printCarousel(response, "movie-today-placeholder");
                    if (response.length === 0) {
                        $("#movie-today-placeholder").html("<div class='fs-2 my-5 text-center'>No Movie Today</div>")
                    }
                }
            }
        );
    }

    function printCarousel(result, id) {
        let carousel = new HorizonCarouselList(result)
        let html = carousel.html()
        $(`#${id}`).html(html)
    }

    getPromotedMovie();
    getRecentMovie();
    getMovieToday();
});
