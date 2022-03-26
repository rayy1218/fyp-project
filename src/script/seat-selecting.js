let seat_selected = []

function toggleSeat(id, seat_id) {
    if (seat_selected.includes(seat_id)) {
        seat_selected.splice(seat_selected.indexOf(seat_id), 1)
        $(`#${id}`).css("background-color", "green")
    }
    else {
        seat_selected.push(seat_id)
        $(`#${id}`).css("background-color", "blue")
    }
}

$(document).ready(() => {
    const URLSearch = new URLSearchParams(window.location.search)
    const scheduled_movie_id = URLSearch.get("scheduled-movie-id")
    const COL_NUM = 10, ROW_NUM = 5

    function getSeat() {
        $.ajax(
            `./api/ticket-purchase.php?action=get-seat&scheduled-movie-id=${scheduled_movie_id}`,
            {
                success: (response) => {
                    print(response)
                },
            }
        );

        function print(result) {
            let to_append =  ""
            let i = 0
            for (let row = 0; row < ROW_NUM; row += 1) {
                to_append += `<div class="row flex-nowrap w-100">`
                for (let col = 0; col < COL_NUM; col += 1) {
                    if (col === 2 || col === 7) {
                        to_append += `<div class="border rounded col p-0" style='background-color: gray'></div>`
                        continue
                    }
                    else if (result[i].ticket_id == null) {
                        to_append += `<div class="border rounded col p-0" style='background-color: green'><button type="button" class='btn seat-btn p-0 w-100 h-100' id="seat${i}" onClick="toggleSeat('seat${i}', ${result[i].seat_id})"></button></div>`
                    }
                    else {
                        to_append += `<div class="border rounded col p-0" style='background-color: red'><button class='btn p-0' disabled></button></div>`
                    }
                    i++
                }
                to_append += "</div>"
            }

            $("#seat-check-group").append(to_append)

            $(".seat-btn").click(() => {
                resetTicketTypeInput()
                adjustTicketTypeInput()
            });
        }

        const seat_form = $("#seat-form")

        seat_form.removeClass("d-none")
        $("#submit-btn").attr("form", "seat-form")
        seat_form.append(`<input id="scheduled-movie-id-placeholder" name="scheduled-movie-id" value="${scheduled_movie_id}" type="hidden" />`)
    }

    function resetTicketTypeInput() {
        $("input#adult-num").val(seat_selected.length.toString())
        $("input#child-elder-num").val("0")
        $("input#student-num").val("0")
    }

    function adjustTicketTypeInput() {
        $("input#adult-num").val(seat_selected.length - $("input#child-elder-num").val() - $("input#student-num").val())
        $("input#child-elder-num").attr("max", seat_selected.length - $("input#student-num").val())
        $("input#student-num").attr("max", seat_selected.length - $("input#child-elder-num").val())
    }

    getSeat();

    $("input#child-elder-num").change(() => {
        adjustTicketTypeInput();
    })

    $("input#student-num").change(() => {
        adjustTicketTypeInput();
    })

    $("#submit-btn").click(() => {
        $.ajax("/src/api/payment.php",
            {
                type: "POST",
                data: {
                    action: "set-ticket",
                    "scheduled-movie-id": $("#scheduled-movie-id-placeholder").val(),
                    "adult-num": $("input#adult-num").val(),
                    "child-elder-num": $("input#child-elder-num").val(),
                    "student-num": $("input#student-num").val(),
                    "seat-ids": seat_selected
                },
                success: (response) => {
                    window.location.href = "/src/payment.html?ticket-id=" + response["ticket_id"]
                }
            }
        )
    })
});