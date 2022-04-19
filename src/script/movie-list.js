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
                  <img src="${row.movie_thumbnail}" class="card-img-top img-thumbnail m-auto p-0 m-3" alt="movie-thumbnail"/>
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
              `;
        }

        $("#movie-list-placeholder").html(append);
    }

    getMovieList();
    $("#search-string").on("input", () => {search()})
});