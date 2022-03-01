$(document).ready(() => {
    function getCinemaList() {
        $.ajax("./api/cinema-theater.php",
            {
                type: "GET",
                data: {
                    action: "get-cinema-list",
                },
                success: (response) => {
                    const result = JSON.parse(response);
                    print(result);
                },
                error: () => {
                    const result = [
                        {cinema_id: 1, cinema_address: "Cinema First"},
                        {cinema_id: 2, cinema_address: "Cinema Second"},
                        {cinema_id: 3, cinema_address: "Cinema Third"}
                    ];
                    print(result);
                }
            }
        );

        function print(result) {
            let append = "";
            for (let row of result) {
                append += `<option value="${row.cinema_id}">${row.cinema_address}</option>`
            }
            $("#schedule-cinema-select").append(append);
        }
    }

    function getScheduledMovie() {
        $.ajax(
            "./api/schedule-employee.php",
            {
                type: "GET",
                data: {
                    action: "get-scheduled-movie",
                    cinema_id: $("#cinema-placeholder option:selected").val(),
                },
                success: (response) => {
                    const result = JSON.parse(response);
                    print(result);
                },
                error: () => {
                    const random = Math.floor(Math.random() * (27 - 1) + 1);

                    const result = [
                        {
                            scheduled_movie_id: 1,
                            movie_title: "Movie 1",
                            scheduled_movie_showing_date: random + "/12/2022",
                            scheduled_movie_starting_time: "1200",
                            movie_duration: 120,
                        },
                        {
                            scheduled_movie_id: 2,
                            movie_title: "Movie 2",
                            scheduled_movie_showing_date: random + "/12/2022",
                            scheduled_movie_starting_time: "1600",
                            movie_duration: 120,
                        },
                        {
                            scheduled_movie_id: 3,
                            movie_title: "Movie 3",
                            scheduled_movie_showing_date: random + "/12/2022",
                            scheduled_movie_starting_time: "2000",
                            movie_duration: 120,
                        },
                        {
                            scheduled_movie_id: 4,
                            movie_title: "Movie 4",
                            scheduled_movie_showing_date: random + 1 + "/12/2022",
                            scheduled_movie_starting_time: "1200",
                            movie_duration: 120,
                        },
                        {
                            scheduled_movie_id: 5,
                            movie_title: "Movie 1",
                            scheduled_movie_showing_date: random + 1 + "/12/2022",
                            scheduled_movie_starting_time: "1600",
                            movie_duration: 120,
                        },
                        {
                            scheduled_movie_id: 6,
                            movie_title: "Movie 1",
                            scheduled_movie_showing_date: random + 2 + "/12/2022",
                            scheduled_movie_starting_time: "0800",
                            movie_duration: 120,
                        },
                        {
                            scheduled_movie_id: 7,
                            movie_title: "Movie 2",
                            scheduled_movie_showing_date: random + 2 + "/12/2022",
                            scheduled_movie_starting_time: "1200",
                            movie_duration: 120,
                        },
                        {
                            scheduled_movie_id: 8,
                            movie_title: "Movie 3",
                            scheduled_movie_showing_date: random + 2 + "/12/2022",
                            scheduled_movie_starting_time: "1600",
                            movie_duration: 120,
                        },
                    ];
                    print(result);
                }
            }
        );

        function print(result) {
            let append = "", date = "", accordion_index = 0;
            for (let i = 0; i < result.length; i += 1) {
                const row = result[i];
                
                if (date !== row.scheduled_movie_showing_date) {
                    accordion_index += 1
                    date = row.scheduled_movie_showing_date;
                    append += `
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="heading${accordion_index}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${accordion_index}" aria-controls="collapse${accordion_index}" aria-expanded="false">
                          ${row.scheduled_movie_showing_date}
                        </button>
                      </h2>
                      <div id="collapse${accordion_index}" class="accordion-collapse collapse" aria-labelledby="heading${accordion_index}" data-bs-parent="#schedule-accordion">
                        <div class="accordion-body">
                          <ol class="list-group">
                    `;
                }
                
                append += `
                  <li class="list-group-item">
                    <div class="row">
                      <div class="col">
                        <p class="fw-bold m-0">${row.movie_title}</p>
                        <p class="m-0">Start Time: ${row.scheduled_movie_starting_time} Duration: ${row.movie_duration}</p>
                      </div>
                      <div class="col-auto">
                        <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#edit-scheduled-movie-modal" data-bs-scheduled-movie-id="${row.scheduled_movie_id}">Edit</button>
                        <br />
                        <button class="btn btn-primary w-100 mt-2" data-bs-toggle="modal" data-bs-target="#delete-scheduled-movie-modal" data-bs-scheduled-movie-id="${row.scheduled_movie_id}">Delete</button>
                      </div>
                    </div>
                  </li>
                `;
                
                if (i + 1 === result.length || date !== result[i + 1].scheduled_movie_showing_date) {
                    append += `
                            </ol>
                          </div>
                        </div>
                      </div>
                    `;
                }
            }

            $("#scheduled-movie-placeholder").html(append);
        }
    }

    getCinemaList();

    $("#query-scheduled-movie-btn").attr("disabled", $("#schedule-cinema-select option:selected").val() === "not-selected");
    $("#schedule-cinema-select").change(() => {
        $("#query-scheduled-movie-btn").attr("disabled", $("#schedule-cinema-select option:selected").val() === "not-selected");
    });
    $("#query-scheduled-movie-btn").click(() => {
        getScheduledMovie();
    });

    const modal = $("#delete-scheduled-movie-modal, #edit-scheduled-movie-modal");
    modal.on("show.bs.modal", (event) => {
        const scheduled_movie_id = event.relatedTarget.getAttribute('data-bs-scheduled-movie-id');
        $(".scheduled-movie-id-field").val(scheduled_movie_id);
    });

    $("#modal-edit-scheduled-movie-btn").click(() => {
        window.location.reload();
    });

    $("#modal-delete-scheduled-movie-btn").click(() => {
        window.location.reload();
    });


});