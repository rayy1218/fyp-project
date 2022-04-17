$(document).ready(() => {
    let list = []

    function getMovieList() {
        $.ajax(
            //return all movie with movie_id, movie_title, movie_thumbnail
            "./api/movie.php",
            {
                type: "GET",
                data: {
                    action: "get-movie-list",
                },
                success: (response) => {
                    list = response
                    print(response);
                },
            }
        )


    }

    function search() {
        const search_string = $("#search-string").val()
        if (search_string.length > 0) {
            const options = {
                isCaseSensitive: false,
                shouldSort: true,
                findAllMatches: true,
                minMatchCharLength: search_string.length,
                keys: [
                    "movie_title"
                ]
            }

            const fuse = new Fuse(list, options)

            let result = fuse.search(search_string)
            let print_list = [];
            for (let i = 0; i < result.length; i += 1) {
                print_list[i] = result[i]["item"]
            }

            print(print_list)
        }
        else {
            print(list)
        }

    }

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

    getMovieList();
    $("#search-string").on("input", () => {search()})
});