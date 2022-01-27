$(document).ready(() => {
    function getMovieList() {
        $.ajax(
            //return all_movie with movie_id, movie_title, movie_duration
            "./api/movie-crud.php",
            {
                data: {
                    action: 'read',
                    col: "movie_id,movie_title,movie_duration",
                },
                success: (response) => {
                    const result = JSON.parse(response)
                    print(result);
                },
                error: () => {
                    //Dummy, should remove after prototype phase
                    const result = [
                        {
                            movie_id: 0,
                            movie_title: "Movie 1",
                            movie_duration: 120,
                        },
                        {
                            movie_id: 1,
                            movie_title: "Movie 2",
                            movie_duration: 120,
                        },
                        {
                            movie_id: 2,
                            movie_title: "Movie 3",
                            movie_duration: 120,
                        },
                        {
                            movie_id: 3,
                            movie_title: "Movie 4",
                            movie_duration: 120,
                        },
                        {
                            movie_id: 4,
                            movie_title: "Movie 5",
                            movie_duration: 120,
                        },
                        {
                            movie_id: 5,
                            movie_title: "Movie 6",
                            movie_duration: 120,
                        },
                        {
                            movie_id: 6,
                            movie_title: "Movie 7",
                            movie_duration: 120,
                        },
                        {
                            movie_id: 7,
                            movie_title: "Movie 8",
                            movie_duration: 120,
                        },
                    ];
                    print(result);
                }
            }
        );

        function print(result) {
            let append = "";
            for (let row of result) {
                append += `
                    <li class="list-group-item">
                        <div class="row">
                            <div class="col">
                                <p class="fw-bold m-0">${row.movie_title}</p>
                                <div class="row">
                                  <div class="col-auto">Duration</div>
                                  <div class="col">${row.movie_duration} minutes</div>
                                </div>
                            </div>
                            <div class="col-auto">
                                <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#edit-movie-modal" data-bs-movie-id="${row.movie_id}">Edit</button>
                                <br/>
                                <button class="btn btn-primary w-100 mt-2" data-bs-toggle="modal" data-bs-target="#delete-movie-modal" data-bs-movie-id="${row.movie_id}">Delete</button>
                                <br/>
                                <button class="btn btn-primary w-100 mt-2" data-bs-toggle="modal" data-bs-target="#schedule-add-movie-modal" data-bs-movie-id="${row.movie_id}">
                                  Add to Schedule
                                </button>
                            </div>
                        </div>
                    </li>
                `;
            }

            $("#movie-list").html(append);
        }
    }

    function addMovie() {
        const movie = {
            movie_title: $("#add-movie-title").val(),
            movie_thumbnail: $("#add-movie-thumbnail").val(),
            movie_duration: $("#add-movie-duration").val(),
            movie_rating: $("#add-movie-rating").val(),
            movie_genre: $("#add-movie-genre").val(),
            movie_language: $("#add-movie-language").val(),
            movie_censorship_rating: $("#add-movie-censorship").val(),
            movie_description: $("#add-movie-description").val(),
        }

        let col = "", values = "", first = true;
        for (let property in movie) {
            if (first) {
                col += `${property}`;
                if (property === "movie_duration") {
                    values += `${movie[property]}`;
                }
                else {
                    values += `'${movie[property]}'`;
                }
            }
            else {
                col += `,${property}`;
                if (property === "movie_duration") {
                    values += `,${movie[property]}`;
                }
                else {
                    values += `,'${movie[property]}'`;
                }

            }
            first = false;
        }

        $.ajax(
            "./api/movie-crud.php",
            {
                type: "GET",
                data: {
                    action: "create",
                    col: col,
                    values: values,
                },
                success: () => {
                    window.location.reload();
                }
            }
        );
    }

    function fillEditModal() {
        $.ajax(
            "./api/movie-crud.php",
            {
                type: "GET",
                data: {
                    action: "read",
                    col: "*",
                    condition: `movie_id=${$("#edit-movie-id-field").val()}`
                },
                success: (response) => {
                    const result = JSON.parse(response);
                    fill(result);
                }
            }
        )

        function fill(result) {
            $("#edit-movie-title").val(result[0].movie_title);
            $("#edit-movie-thumbnail").val(result[0].movie_thumbnail);
            $("#edit-movie-duration").val(result[0].movie_duration);
            $("#edit-movie-rating").val(result[0].movie_rating);
            $("#edit-movie-description").val(result[0].movie_description);

            selectOption("#edit-movie-genre", result[0].movie_genre);
            selectOption("#edit-movie-language", result[0].movie_language);
            selectOption("#edit-movie-censorship", result[0].movie_censorship_rating);
        }

        function selectOption(select_id, option_to_select) {
            const str = `${select_id} option`
            const options = $(str);

            for (let option of options) {
                if (option.value == option_to_select) {
                    option.setAttribute("selected", true);
                }
            }

        }
    }

    function editMovie() {
        const movie = {
            movie_title: $("#edit-movie-title").val(),
            movie_thumbnail: $("#edit-movie-thumbnail").val(),
            movie_duration: $("#edit-movie-duration").val(),
            movie_rating: $("#edit-movie-rating").val(),
            movie_genre: $("#edit-movie-genre").val(),
            movie_language: $("#edit-movie-language").val(),
            movie_censorship_rating: $("#edit-movie-censorship").val(),
            movie_description: $("#edit-movie-description").val(),
        }

        let set = "", condition = `movie_id = ${$("#edit-movie-id-field").val()}`, first = true;
        for (let property in movie) {
            if (first) {
                set += `${property}='${movie[property]}'`
            }
            else {
                set += `,${property}='${movie[property]}'`
            }
            first = false;
        }

        $.ajax(
            "./api/movie-crud.php",
            {
                type: "GET",
                data: {
                    action: "update",
                    set: set,
                    condition: condition,
                },
                success: () => {
                    window.location.reload();
                }
            }
        );
    }

    function deleteMovie() {
        $.ajax(
            "./api/movie-crud.php",
            {
                type: "GET",
                data: {
                    action: "delete",
                    condition: `movie_id = ${$("#delete-movie-id-field").val()}`
                },
                success: () => {
                    window.location.reload();
                },
                error: () => {

                }
            },

        )
    }

    function addMovieToSchedule() {
        $.ajax(
            "./api/movie-to-schedule.php"
        )
    }

    getMovieList();

    const modal = $("#schedule-add-movie-modal, #delete-movie-modal");
    modal.on("show.bs.modal", (event) => {
        const movie_id = event.relatedTarget.getAttribute('data-bs-movie-id');
        $(".movie-id-field").val(movie_id);
    });

    $("#modal-add-movie-btn").click(() => {
        addMovie();
    });

    $("#edit-movie-modal").on("show.bs.modal", (event) => {
        const movie_id = event.relatedTarget.getAttribute('data-bs-movie-id');
        $("#edit-movie-id-field").val(movie_id);

        fillEditModal();
    });

    $("#modal-edit-movie-btn").click(() => {
        editMovie();
    });

    $("#modal-delete-movie-btn").click(() => {
        deleteMovie();
    });
});