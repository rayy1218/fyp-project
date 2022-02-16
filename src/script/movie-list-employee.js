$(document).ready(() => {
    function getMovieList() {
        $.ajax(
            //return all_movie with movie_id, movie_title, movie_duration
            "./api/movie.php",
            {
                data: {
                    action: 'get-movie-list-employee',
                },
                success: (response) => {
                    print(response);
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
        $.ajax(
            "./api/movie.php",
            {
                type: "GET",
                data: {
                    action: "add-movie",
                    "movie-title": $("#add-movie-title").val(),
                    "movie-thumbnail": $("#add-movie-thumbnail").val(),
                    "movie-duration": $("#add-movie-duration").val(),
                    "movie-rating": $("#add-movie-rating").val(),
                    "movie-genre": $("#add-movie-genre").val(),
                    "movie-language": $("#add-movie-language").val(),
                    "movie-censorship-rating": $("#add-movie-censorship").val(),
                    "movie-description": $("#add-movie-description").val(),
                },
                success: () => {
                    window.location.reload()
                }
            }
        );
    }

    function fillEditModal() {
        $.ajax(
            "./api/movie.php",
            {
                type: "GET",
                data: {
                    action: "get-movie-detail",
                    "movie-id": $("#edit-movie-id-field").val()
                },
                success: (response) => {
                    fill(response);
                }
            }
        )

        function fill(result) {
            $("#edit-movie-title").val(result["movie_title"]);
            $("#edit-movie-thumbnail").val(result["movie_thumbnail"]);
            $("#edit-movie-duration").val(result["movie_duration"]);
            $("#edit-movie-rating").val(result["movie_rating"]);
            $("#edit-movie-description").val(result["movie_description"]);

            selectOption("#edit-movie-genre", result["movie_genre"]);
            selectOption("#edit-movie-language", result["movie_language"]);
            selectOption("#edit-movie-censorship", result["movie_censorship_rating"]);
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
        $.ajax(
            "./api/movie.php",
            {
                type: "GET",
                data: {
                    action: "edit-movie",
                    "movie-id": $("#edit-movie-id-field").val(),
                    "movie-title": $("#edit-movie-title").val(),
                    "movie-thumbnail": $("#edit-movie-thumbnail").val(),
                    "movie-duration": $("#edit-movie-duration").val(),
                    "movie-rating": $("#edit-movie-rating").val(),
                    "movie-genre": $("#edit-movie-genre").val(),
                    "movie-language": $("#edit-movie-language").val(),
                    "movie-censorship-rating": $("#edit-movie-censorship").val(),
                    "movie-description": $("#edit-movie-description").val(),
                },
                success: () => {
                    console.log("edit");
                    window.location.reload()
                }
            }
        );
    }

    function deleteMovie() {
        $.ajax(
            "./api/movie.php",
            {
                type: "GET",
                data: {
                    action: "delete-movie",
                    "movie-id": $("#delete-movie-id-field").val()
                },
                success: () => {
                    getMovieList();
                    window.location.reload()
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