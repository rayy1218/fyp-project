$(document).ready(() => {
    function getMovieList() {
        $.ajax(
            //return all movie with movie_id, movie_title, movie_thumbnail
            "./api/movie-list.php",
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    print(result)
                },

                error: () => {
                    //Dummy, should remove after prototype phase
                    const result = [
                        {
                            movie_id: 0,
                            movie_title: "Movie 1",
                            movie_thumbnail: "./resource/no-image.png"
                        },
                        {
                            movie_id: 1,
                            movie_title: "Movie 2",
                            movie_thumbnail: "./resource/no-image.png"
                        },
                        {
                            movie_id: 2,
                            movie_title: "Movie 3",
                            movie_thumbnail: "./resource/no-image.png"
                        },
                        {
                            movie_id: 3,
                            movie_title: "Movie 4",
                            movie_thumbnail: "./resource/no-image.png"
                        },
                        {
                            movie_id: 4,
                            movie_title: "Movie 5",
                            movie_thumbnail: "./resource/no-image.png"
                        },
                        {
                            movie_id: 5,
                            movie_title: "Movie 6",
                            movie_thumbnail: "./resource/no-image.png"
                        },
                        {
                            movie_id: 6,
                            movie_title: "Movie 7",
                            movie_thumbnail: "./resource/no-image.png"
                        },
                        {
                            movie_id: 7,
                            movie_title: "Movie 8",
                            movie_thumbnail: "./resource/no-image.png"
                        },
                    ];
                    print(result);
                },
            }
        )

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