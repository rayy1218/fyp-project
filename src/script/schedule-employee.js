$(document).ready(() => {
    function getCinemaList() {
        $.ajax("./api/cinema-theater.php",
            {
                type: "GET",
                data: {
                    action: "get-cinema-list",
                },
                success: (response) => {
                    print(response)
                },
            }
        )

        function print(result) {
            let append = ""
            for (let row of result) {
                append += `<option value="${row.cinema_id}">${row.cinema_address}</option>`
            }
            $("#schedule-cinema-select").append(append)
        }
    }

    function getScheduledMovie() {
        $.ajax(
            "./api/schedule-employee.php",
            {
                type: "GET",
                data: {
                    action: "get-scheduled-movie",
                    "cinema-id": $("#schedule-cinema-select option:selected").val(),
                },
                success: (response) => {
                    print(response)
                }
            }
        )

        function print(result) {
            let append = "", date = "", accordion_index = 0
            for (let i = 0; i < result.length; i += 1) {
                const row = result[i]
                
                if (date !== row.scheduled_movie_showing_date) {
                    accordion_index += 1
                    date = row.scheduled_movie_showing_date
                    append += `
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="heading${accordion_index}">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${accordion_index}" aria-controls="collapse${accordion_index}" aria-expanded="false">
                          ${row.scheduled_movie_showing_date}
                        </button>
                      </h2>
                      <div id="collapse${accordion_index}" class="accordion-collapse collapse" aria-labelledby="heading${accordion_index}" data-bs-parent="#scheduled-movie-placeholder">
                        <div class="accordion-body">
                          <ol class="list-group">
                    `
                }
                
                append += `
                  <li class="list-group-item">
                    <div class="row">
                      <div class="col">
                        <p class="fw-bold m-0">${row.movie_title}</p>
                        <p class="m-0">Start Time: ${row.scheduled_movie_start_time} Duration: ${row.movie_duration} minutes </p>
                      </div>
                      <div class="col-auto">
                        <button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#edit-scheduled-movie-modal" data-bs-scheduled-movie-id="${row.scheduled_movie_id}">Edit</button>
                        <br />
                        <button class="btn btn-primary w-100 mt-2" data-bs-toggle="modal" data-bs-target="#delete-scheduled-movie-modal" data-bs-scheduled-movie-id="${row.scheduled_movie_id}">Delete</button>
                      </div>
                    </div>
                  </li>
                `
                
                if (i + 1 === result.length || date !== result[i + 1].scheduled_movie_showing_date) {
                    append += `
                            </ol>
                          </div>
                        </div>
                      </div>
                    `
                }
            }

            $("#scheduled-movie-placeholder").html(append)
        }
    }

    function getScheduledMovieData() {
        $.ajax(
            "./api/schedule-employee.php",
            {
                type: "GET",
                data: {
                    action: "get-scheduled-movie-data",
                    "scheduled-movie-id": $(".scheduled-movie-id-field").val()
                },
                success: (response1) => {
                    let cinema_id = response1["cinema_id"], theater_id = response1["theater_id"]

                    $.ajax("./api/cinema-theater.php",
                        {
                            type: "GET",
                            data: {
                                action: "get-cinema-list",
                            },
                            success: (response2) => {
                                printCinemaList(response2, cinema_id)
                            },
                        }
                    )

                    $.ajax(
                        "/src/api/schedule-employee.php",
                        {
                            data: {
                                action: "get-theater-list",
                                "scheduled-movie-id": $(".scheduled-movie-id-field").val()
                            },
                            success: (response3) => {
                                printTheaterList(response3, theater_id)
                            }
                        }
                    )

                    printDatetime(response1)
                }
            }
        )

        function printCinemaList(response, id) {
            let html = ""
            for (let row of response) {
                if (row["cinema_id"] === id) {
                    html += `<option value="${row["cinema_id"]}" selected>${row["cinema_address"]}</option>`
                }
                else {
                    html += `<option value="${row["cinema_id"]}">${row["cinema_address"]}</option>`
                }
            }
            $("#schedule-cinema").append(html)
        }

        function printTheaterList(response, id) {
            let append = "<option value=\"not-selected\">Select Theater</option>"
            for (let row of response) {
                if (row["theater_id"] === id) {
                    append += `<option value="${row["theater_id"]}" selected>${row["theater_name"]}</option>`
                }
                else {
                    append += `<option value="${row["theater_id"]}">${row["theater_name"]}</option>`
                }
            }
            $("#schedule-theater").html(append)
        }

        function printDatetime(response) {
            $("#schedule-date").val(response["scheduled_movie_showing_date"])
            $("#schedule-time").val(response["scheduled_movie_start_time"])
        }
    }

    function editScheduledMovie() {
        $.ajax(
            "./api/schedule-employee.php",
            {
                type: "POST",
                data: {
                    action: "edit-scheduled-movie",
                    "scheduled-movie-id": $(".scheduled-movie-id-field").val(),
                    "theater-id": $("#schedule-theater option:selected").val(),
                    "scheduled-movie-showing-date": $("#schedule-date").val(),
                    "scheduled-movie-start-time": $("#schedule-time").val()
                },
                success: () => {
                    let edit_modal = new bootstrap.Modal(document.getElementById('edit-scheduled-movie-modal'))
                    edit_modal.dispose()

                    getScheduledMovie()
                }
            }
        )
    }

    function deleteScheduledMovie() {
        $.ajax(
            "./api/schedule-employee.php",
            {
                type: "POST",
                data: {
                    action: "delete-scheduled-movie",
                    "scheduled-movie-id": $(".scheduled-movie-id-field").val()
                },
                success: () => {
                    let delete_modal = new bootstrap.Modal(document.getElementById('delete-scheduled-movie-modal'))
                    delete_modal.dispose()

                    getScheduledMovie()
                }
            }
        )
    }

    getCinemaList()

    $("#query-scheduled-movie-btn").attr("disabled", $("#schedule-cinema-select option:selected").val() === "not-selected")
    $("#schedule-cinema-select").change(() => {
        $("#query-scheduled-movie-btn").attr("disabled", $("#schedule-cinema-select option:selected").val() === "not-selected")
    })
    $("#query-scheduled-movie-btn").click(() => {
        getScheduledMovie()
    })


    $("#delete-scheduled-movie-modal").on("show.bs.modal", (event) => {
        const scheduled_movie_id = event.relatedTarget.getAttribute('data-bs-scheduled-movie-id')
        $(".scheduled-movie-id-field").val(scheduled_movie_id)
    })

    $("#edit-scheduled-movie-modal").on("show.bs.modal", (event) => {
        const scheduled_movie_id = event.relatedTarget.getAttribute('data-bs-scheduled-movie-id')
        $(".scheduled-movie-id-field").val(scheduled_movie_id)
        getScheduledMovieData()
    })

    $("#schedule-cinema").change(() => {
        if ($("#schedule-cinema option:selected").val() !== "not-selected") {
            $.ajax("./api/cinema-theater.php",
                {
                    type: "GET",
                    data: {
                        action: "get-theater-list",
                        "cinema-id": $("#schedule-cinema option:selected").val()
                    },
                    success: (response) => {
                        print(response)
                    },
                }
            )

            function print(result) {
                console.log(result)
                let html = "<option value=\"not-selected\" selected>Select Theater</option>"
                for (let row of result) {
                    html += `<option value="${row.theater_id}">${row.theater_name}</option>`
                }
                $("#schedule-theater").html(html)
            }
            $("#schedule-theater").attr("disabled", false)
        }
        else {
            $("#schedule-theater").attr("disabled", true)
        }

    })

    $("#modal-edit-scheduled-movie-btn").click(() => {
        editScheduledMovie()
    })

    $("#modal-delete-scheduled-movie-btn").click(() => {
        deleteScheduledMovie()
    })


})