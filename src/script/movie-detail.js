$(document).ready(() => {
    const URLSearch = new URLSearchParams(window.location.search);
    const movie_id = URLSearch.get("movie-id");

    function getDetail() {
        $.ajax(
            `./api/movie.php`,
            {
                type: "GET",
                data: {
                    action: "get-movie-detail",
                    "movie-id": movie_id
                },
                success: (response) => {
                    print(response);
                },
                error: () => {
                    const result = {
                        "movie-duration": 120,
                        "movie-genre": "-",
                        "movie-language": "English",
                        "movie-censorship_rating": "PG13",
                        "movie-rating": "4.0/5.0",
                        "movie-description": " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        "movie-thumbnail": "./resource/no-image.png"
                    }

                    print(result);
                }
            }
        )

        function print(result) {
            $("#duration-placeholder").html(result.movie_duration + " minutes");
            $("#genre-placeholder").html(result.movie_genre);
            $("#language-placeholder").html(result.movie_language);
            $("#censorship-placeholder").html(result.movie_censorship_rating);
            $("#rating-placeholder").html(result.movie_rating);
            $("#description-placeholder").html(result.movie_description);
            $("#thumbnail-placeholder").prop("src", result.movie_thumbnail);
        }
    }

    $("#book-btn").attr("href", `/src/ticket-purchase.html?movie-id=${movie_id}`);

    getDetail();
});