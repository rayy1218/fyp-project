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
            $(".cinema-select").append(append);
        }
    }

    function getTheaterList() {
        const cinema_id = $("#cinema-placeholder option:selected").val();
        if (cinema_id === "not-selected") {return;}

        $.ajax(
            "./api/cinema-theater.php",
            {
                type: "GET",
                data: {
                    action: "get-theater-list",
                    cinema_id: cinema_id,
                },
                success: (response) => {
                    const result = JSON.parse(response);
                    print(result);
                },
                error: () => {
                    let result = [], random = Math.ceil(Math.random() * (4 - 1) + 1);
                    for (let i = 1; i <= random; i += 1) {
                        result.push({theater_id: i, theater_name: `Theater ${i}`});
                    }

                    print(result);
                }
            }
        );

        function print(result) {
            let append = "";

            for (let row of result) {
                append += `<li class="list-group-item">${row.theater_name}</li>`
            }

            $("#theater-placeholder").html(append);
        }
    }

    function addCinema() {
        $.ajax(
            "./api/cinema-theater.php",
            {
                type: "GET",
                data: {
                    action: "add-cinema",
                    cinema_address: $("#add-cinema-address").val(),
                },
                success: () => {
                    window.location.reload();
                },
                error: () => {
                    window.location.reload();
                }
            }
        )
    }

    function addTheater() {
        const cinema_id = $("#cinema-placeholder option:selected").val();
        if (cinema_id === "not-selected") {return;}

        $.ajax(
            "./api/cinema-theater.php",
            {
                type: "GET",
                data: {
                    action: "add-theater",
                    cinema_id: cinema_id,
                    theater_name: $("#add-theater-name").val(),
                },
                success: () => {
                    window.location.reload();
                },
                error: () => {
                    window.location.reload();
                }
            }
        )
    }

    getCinemaList();

    $("#query-theater-btn").click(() => {
        getTheaterList();
    });

    $("#add-cinema-btn").click(() => {
        addCinema();
    });

    $("#add-theater-btn").click(() => {
        addTheater();
    });

    $("#cinema-placeholder").change(() => {
        $("#add-theater-modal-call-btn").attr("disabled", $("#cinema-placeholder option:selected").val() === "not-selected");
    });
});