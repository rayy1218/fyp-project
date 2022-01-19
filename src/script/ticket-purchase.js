let seat_selected = [];

function toggleSeat(id) {
    if (seat_selected.includes(id)) {
        seat_selected.splice(seat_selected.indexOf(id), 1);
        $(`#${id}`).css("background-color", "green");
    }
    else {
        seat_selected.push(id);
        $(`#${id}`).css("background-color", "blue");
    }

    resetTicketTypeInput();
    adjustTicketTypeInput();

    const submit = $("div.submit");
    if (seat_selected.length > 0) {
        submit.removeClass("invisible");
    }
    else {
        submit.addClass("invisible");
    }
}

function resetTicketTypeInput() {
    $("input#adult-num").val(seat_selected.length.toString());
    $("input#child-elder-num").val("0");
    $("input#student-num").val("0");

    calcSummary();
}

function calcSummary() {
    const price = $("input#adult-num").val() * 5 + $("input#child-elder-num").val() * 2 + $("input#student-num").val() * 4;
    $("div.summary").html(`RM${price}`);
}

function generateDateInput() {
    const random_day = Math.floor(Math.random() * 27) + 1;
    let date_radio_group = $("#date-radio-group");
    date_radio_group.html("");

    //Add dummy date for prototype use
    for (let i = random_day; i < random_day + 3; i += 1) {
        date_radio_group.append(
            `<div class="form-check">
                    <input class="form-check-input date-radio" type="radio" name="date" id="date-radio${i - random_day + 1}" value="" />
                    <label class="form-check-label" for="date-radio${i - random_day + 1}">${i}/11</label>
                 </div>`
        );
    }

    $("input.date-radio").change(() => {
        generateTimeInput();
        $("div.time-radios").removeClass("invisible");
        $("div.seat-checks").addClass("invisible");
        $("div.ticket-type-input").addClass("invisible");
        $("div.summary").addClass("invisible");
    })
}

function generateTimeInput() {
    let time_radio_group = $("#time-radio-group");
    time_radio_group.html("");

    //Add dummy time for prototype use
    const random_time_arr = [];
    for (let i = 0; i < 5; i += 1) {
        random_time_arr.push(Math.floor(Math.random() * 24));
    }
    random_time_arr.sort((num1, num2) => {
        return num1 - num2;
    });

    for (let i = 0; i < 5; i += 1) {
        time_radio_group.append(
            `<div class="class-form-check">
                <input class="form-check-input time-radio" type="radio" name="time" id="time-radio${i + 1}" value=""/>
                <label class="form-check-label" for="time-radio${i + 1}">${random_time_arr[i]}:00</label>
             </div>`
        )
    }

    $("input.time-radio").change(() => {
        generateSeatInput();
        $("div.seat-checks").removeClass("invisible");
        $("div.ticket-type-input").removeClass("invisible");
        $("div.summary").removeClass("invisible");
        seat_selected = [];
        adjustTicketTypeInput();
    })
}

function generateSeatInput() {
    const COL_NUM = 10, ROW_NUM = 5, table = $(".seat-display-table");
    let to_append =  "";

    table.html("");
    for (let row = 0; row < ROW_NUM; row += 1) {
        to_append += "<tr>";
        for (let col = 0; col < COL_NUM; col += 1) {
            if (col === 2 || col === 7) {
                to_append += "<td style='background-color: gray'>-</td>";
            }
            else if (Math.floor(Math.random() * 10) < 7) {
                to_append += `<td style='background-color: green'><button type="button" class='btn' id="row${row}-col${col}" onClick="toggleSeat('row${row}-col${col}')">👤</button></td>`;
            }
            else {
                to_append += "<td style='background-color: red'><button class='btn' disabled>👤</button></td>>";
            }
        }
        to_append += "</tr>";
    }

    table.append(to_append);
}

function adjustTicketTypeInput() {
    $("input#adult-num").val(seat_selected.length - $("input#child-elder-num").val() - $("input#student-num").val());
    $("input#child-elder-num").attr("max", seat_selected.length - $("input#student-num").val());
    $("input#student-num").attr("max", seat_selected.length - $("input#child-elder-num").val());
    calcSummary();
}

$(function() {
    $("select#cinema").change(() => {
        if ($("select#cinema").val() === "default") {return;}
        generateDateInput();
        $("div.date-radios").removeClass("invisible");
        $("div.time-radios").addClass("invisible");
        $("div.seat-checks").addClass("invisible");
        $("div.ticket-type-input").addClass("invisible");
        $("div.summary").addClass("invisible");
    });

    $("input#child-elder-num").change(() => {
        adjustTicketTypeInput();
    });

    $("input#student-num").change(() => {
        adjustTicketTypeInput();
    })
})

