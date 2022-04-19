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
            $("#title-placeholder").html(result.movie_title);
        }
    }

    $("#book-btn").attr("href", `/src/ticket-purchase.html?movie-id=${movie_id}`);

    getDetail();
});