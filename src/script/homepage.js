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
                <div class="card">
                  <img src="${this.movie_thumbnail}" class="card-img-top" alt="movie-thumbnail"/>
                  <div class="card-body">
                    <h6 class="card-title">${this.movie_title}</h6>
                    <div class="row">
                      <a href="/src/movie-detail.html?movie-id=${this.movie_id}" class="btn btn-outline-primary col">Detail</a>
                      <a href="/src/ticket-purchase.html?movie-id=${this.movie_id}" class="btn btn-outline-secondary col">Book</a>
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
            "homepage.php?action=promoted-movie",
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    print(result);
                },
                error: () => {
                    const result = [
                        {
                            movie_id: 0,
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 1,
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 2,
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                    ];
                    print(result);
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
            "homepage.php?action=recent-movie",
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    printCarousel(result, "recent-movie-placeholder");
                },
                error: () => {
                    const result = [
                        {
                            movie_id: 0,
                            movie_title: "Movie 1",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 1,
                            movie_title: "Movie 2",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 2,
                            movie_title: "Movie 3",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 3,
                            movie_title: "Movie 4",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 4,
                            movie_title: "Movie 5",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 5,
                            movie_title: "Movie 6",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 6,
                            movie_title: "Movie 7",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 7,
                            movie_title: "Movie 8",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                    ];
                    printCarousel(result, "recent-movie-placeholder");
                }
            }
        );
    }

    function getMovieToday() {
        $.ajax("homepage.php?action=movie-today",
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    printCarousel(result, "movie-today-placeholder");
                },
                error: () => {
                    const result = [
                        {
                            movie_id: 0,
                            movie_title: "Movie 1",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 1,
                            movie_title: "Movie 2",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 2,
                            movie_title: "Movie 3",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 3,
                            movie_title: "Movie 4",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 4,
                            movie_title: "Movie 5",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 5,
                            movie_title: "Movie 6",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 6,
                            movie_title: "Movie 7",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 7,
                            movie_title: "Movie 8",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                        {
                            movie_id: 8,
                            movie_title: "Movie 9",
                            movie_thumbnail: "./src/resource/no-image.png"
                        },
                    ];
                    printCarousel(result, "movie-today-placeholder");
                }
            }
        );
    }

    function printCarousel(result, id) {
        let carousel = new HorizonCarouselList(result);
        $(`#${id}`).html(carousel.html());
    }

    getPromotedMovie();
    getRecentMovie();
    getMovieToday();
});
