$(document).ready(() => {
    const URLSearch = new URLSearchParams(window.location.search);
    const movie_id = URLSearch.get("movie-id"), cinema_id = URLSearch.get("cinema-id"), date = URLSearch.get("date"), time = URLSearch.get("time");

    function getCinemaList() {
        $.ajax(
            `./api/ticket-purchase.php?action=get-cinema-list&movie-id=${movie_id}`,
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    print(result);
                },
                error: () => {
                    const result = [
                        {
                            cinema_id: 1,
                            cinema_name: "First cinema",
                        },
                        {
                            cinema_id: 2,
                            cinema_name: "Second cinema",
                        }
                    ];

                    print(result);
                }
            }
        );

        function print(result) {
            let append = `<option value="no-selected" selected>Select Cinema</option>`;
            for (let row of result) {
                append += `<option value="${row.cinema_id}">${row.cinema_name}</option>`;
            }

            $("#cinema-list-placeholder").html(append);
        }

        const cinema_form = $("#cinema-form");

        cinema_form.removeClass("d-none");
        $("#submit-btn").attr("form", "cinema-form");
        cinema_form.append(`<input name="movie-id" value="${movie_id}" type="hidden" />`)
    }

    function getDateList() {
        $.ajax(
            `./api/ticket-purchase.php?action=get-date-list&movie=id=${movie_id}&cinema_id=${cinema_id}`,
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    print(result);
                },
                error: () => {
                    const result = [
                        {
                            date: "12-12-2022"
                        },
                        {
                            date: "13-12-2022"
                        },
                        {
                            date: "14-12-2022"
                        }
                    ];
                    print(result);
                }
            }
        );

        function print(result) {
            let append = "";
            for (let i = 0; i < result.length; i += 1) {
                const row = result[i];
                append += `
                    <div class="form-check">
                      <input class="form-check-input date-radio" type="radio" name="date" id="date-radio${i + 1}" value="${row.date}" />
                      <label class="form-check-label" for="date-radio${i + 1}">${row.date}</label>
                    </div>
                `;
            }

            $("#date-radio-group").html(append);
        }

        const date_form = $("#date-form");

        date_form.removeClass("d-none");
        $("#submit-btn").attr("form", "date-form");
        date_form.append(`<input name="movie-id" value="${movie_id}" type="hidden" />`);
        date_form.append(`<input name="cinema-id" value="${cinema_id}" type="hidden" />`);
    }

    function getTimeList() {
        $.ajax(
            `./api/ticket-purchase.php?action=get-time-list&movie=id=${movie_id}&cinema_id=${cinema_id}&date=${date}`,
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    print(result);
                },
                error: () => {
                    const result = [
                        {
                            time: 1100
                        },
                        {
                            time: 2000
                        }
                    ];

                    print(result);
                }
            }
        )

        function print(result) {
            let append = "";
            for (let i = 0; i < result.length; i += 1) {
                const row = result[i];
                append += `
                    <div class="form-check">
                      <input class="form-check-input time-radio" type="radio" name="time" id="time-radio${i + 1}" value="${row.time}" />
                      <label class="form-check-label" for="time-radio${i + 1}">${row.time}</label>
                    </div>
                `;
            }

            $("#time-radio-group").html(append);
        }

        const time_form = $("#time-form");

        time_form.removeClass("d-none");
        $("#submit-btn").attr("form", "time-form");
        time_form.append(`<input name="movie-id" value="${movie_id}" type="hidden" />`);
        time_form.append(`<input name="cinema-id" value="${cinema_id}" type="hidden" />`);
        time_form.append(`<input name="date" value="${date}" type="hidden" />`);
    }

    function getScheduledMovie() {
        $.ajax(
            `./api/ticket-purchase.php?action=get-scheduled-movie-id&movie=id=${movie_id}&cinema_id=${cinema_id}&date=${date}&time=${time}`,
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    window.location.href = `./seat-selecting.html?scheduled-movie-id=${result[0].scheduled_movie_id}`;
                },
                error: () => {
                    const result = [{scheduled_movie_id: 1}];
                    window.location.href = `./seat-selecting.html?scheduled-movie-id=${result[0].scheduled_movie_id}`;
                }
            }
        );
    }

    if (cinema_id == null) {getCinemaList();}
    else if (date == null) {getDateList();}
    else if (time == null) {getTimeList();}
    else {getScheduledMovie();}
});