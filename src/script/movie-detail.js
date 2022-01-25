$(document).ready(() => {
    const URLSearch = new URLSearchParams(window.location.search);
    const movie_id = URLSearch.get("movie-id");

    function getDetail() {
        $.ajax(
            `./api/movie-details.php?movie_id=${movie_id}`,
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    print(result);
                },
                error: () => {
                    const result = {
                        movie_duration: "Good Movie",
                        movie_genre: "-",
                        movie_language: "English",
                        movie_censorship_rating: "PG13",
                        movie_rating: "4.0/5.0",
                        movie_description: " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore etdolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip exea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                        movie_thumbnail: "./resource/no-image.png"
                    }

                    print(result);
                }
            }
        )

        function print(result) {
            $("#duration-placeholder").html(result.movie_duration);
            $("#genre-placeholder").html(result.movie_genre);
            $("#language-placeholder").html(result.movie_language);
            $("#censorship-placeholder").html(result.movie_censorship_rating);
            $("#rating-placeholder").html(result.movie_rating);
            $("#description-placeholder").html(result.movie_description);
            $("#thumbnail-placeholder").prop("src", result.movie_thumbnail);
        }
    }

    getDetail();
});