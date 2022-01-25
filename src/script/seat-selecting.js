let seat_selected = [];

function toggleSeat(id, seat_id) {
    if (seat_selected.includes(seat_id)) {
        seat_selected.splice(seat_selected.indexOf(seat_id), 1);
        $(`#${id}`).css("background-color", "green");
    }
    else {
        seat_selected.push(seat_id);
        $(`#${id}`).css("background-color", "blue");
    }
    console.log(seat_selected);
    let seat_str = "[", first = true;
    for (let seat of seat_selected) {
        if (first) {seat_str += `${seat}`;}
        else {seat_str += `,${seat}`;}
        first = false;
    }
    seat_str += "]";
    console.log(seat_str);
    $("#seat-ids-placeholder").val(seat_str);

}

$(document).ready(() => {
    const URLSearch = new URLSearchParams(window.location.search);
    const scheduled_movie_id = URLSearch.get("scheduled-movie-id");
    const COL_NUM = 10, ROW_NUM = 5;

    function getSeat() {
        $.ajax(
            `./api/ticket-purchase.php?action=get-seat&scheduled-movie-id=${scheduled_movie_id}`,
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    print(result);
                },
                error: () => {
                    const result = [];
                    for (let row = 1; row <= ROW_NUM; row += 1) {
                        for (let col = 1; col <= COL_NUM; col += 1) {
                            let ticket_id = Math.floor(Math.random() * 100);
                            if (ticket_id < 70) {ticket_id = null;}
                            let seat = {
                                seat_id: row * COL_NUM + col,
                                seat_col: col,
                                seat_row: row,
                                ticket_id: ticket_id
                            }
                            result.push(seat);
                        }
                    }
                    print(result);
                }

            }
        );

        function print(result) {
            let to_append =  "";
            let i = 0;
            for (let row = 0; row < ROW_NUM; row += 1) {
                to_append += "<tr>";
                for (let col = 0; col < COL_NUM; col += 1) {
                    if (col === 2 || col === 7) {
                        to_append += "<td style='background-color: gray'>-</td>";
                        continue;
                    }
                    else if (result[i].ticket_id == null) {
                        to_append += `<td style='background-color: green'><button type="button" class='btn seat-btn' id="seat${i}" onClick="toggleSeat('seat${i}', ${result[i].seat_id})">👤</button></td>`;
                    }
                    else {
                        to_append += "<td style='background-color: red'><button class='btn' disabled>👤</button></td>>";
                    }
                    i++;
                }
                to_append += "</tr>";
            }

            $(".seat-display-table").append(to_append);

            $(".seat-btn").click(() => {
                resetTicketTypeInput();
                adjustTicketTypeInput();
            });
        }

        const seat_form = $("#seat-form");

        seat_form.removeClass("d-none");
        $("#submit-btn").attr("form", "seat-form");
        seat_form.append(`<input name="scheduled-movie-id" value="${scheduled_movie_id}" type="hidden" />`);
    }

    function resetTicketTypeInput() {
        $("input#adult-num").val(seat_selected.length.toString());
        $("input#child-elder-num").val("0");
        $("input#student-num").val("0");
    }

    function adjustTicketTypeInput() {
        $("input#adult-num").val(seat_selected.length - $("input#child-elder-num").val() - $("input#student-num").val());
        $("input#child-elder-num").attr("max", seat_selected.length - $("input#student-num").val());
        $("input#student-num").attr("max", seat_selected.length - $("input#child-elder-num").val());
    }

    getSeat();

    $("input#child-elder-num").change(() => {
        adjustTicketTypeInput();
    });

    $("input#student-num").change(() => {
        adjustTicketTypeInput();
    })
});