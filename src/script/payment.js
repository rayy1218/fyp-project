$(document).ready(() => {
    const URLSearch = new URLSearchParams(window.location.search);
    const scheduled_movie_id = URLSearch.get("scheduled_movie_id"), adult = URLSearch.get("adult-num"),
        child_or_elder = URLSearch.get("child-elder-num"), student = URLSearch.get("student-num"),
        seat_ids = JSON.parse(URLSearch.get("seat-ids"));

    function getSummary() {
        let seat_ids_str = "";
        for (let seat_id of seat_ids) {
            seat_ids_str += `&seat-id[]=${seat_id}`
        }
        $.ajax(
            `./api/payment.html?action=get-summary&scheduled-movie-id=${scheduled_movie_id}${seat_ids_str}&adult-num=${adult}&child-elder-num=${child_or_elder}&student-num=${student}`,
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    print(result);
                },
                error: () => {
                    let seats = [];
                    for (let seat_id of seat_ids) {
                        let place = seat_id - 10, row = Math.ceil(place / 8), col = place % 8;
                        const row_alphabet = String.fromCharCode(65 + row - 1);
                        seats.push(`${row_alphabet}${col}`);
                    }

                    const pay = adult * 5 + child_or_elder * 3 + student * 4;

                    const result = {
                        movie_name: "Good Movie",
                        seats: seats,
                        adult_num: adult,
                        child_elder_num: child_or_elder,
                        student_num: student,
                        ticket_payment_amount: pay
                    };

                    print(result);
                }
            }
        )
        function print(result) {
            let append = "";

            let seat_str = "", first = true;
            for (let seat of result.seats) {
                if (first) {seat_str += `${seat}`;}
                else {seat_str += `, ${seat}`;}
                first = false;
            }

            append += `<div class="row"><div class="col-4">Movie Name</div><div class="col">${result.movie_name}</div></div>`;
            append += `<div class="row"><div class="col-4">Seat</div><div class="col">${seat_str}</div></div>`;
            append += `<div class="row"><div class="col-4">Ticket Amount</div><div class="col">Adult: ${result.adult_num}, Child/Elder: ${result.child_elder_num}, Student: ${result.student_num}</div></div>`;
            append += `<div class="row"><div class="col-4">Payment</div><div class="col">RM${result.ticket_payment_amount}</div></div>`;

            $("#summary").append(append);
        }
    }

    function setTicket() {
        let seat_ids_str = "";
        for (let seat_id of seat_ids) {
            seat_ids_str += `&seat-id[]=${seat_id}`
        }

        $.ajax(
            `./api/payment.html?action=set-ticket&scheduled-movie-id=${scheduled_movie_id}${seat_ids_str}&adult-num=${adult}&child-elder-num=${child_or_elder}&student-num=${student}`,
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    window.location.href = `./receipt.html?ticket-id=${result.ticket_id}`;
                },
                error: () => {
                    const result = {ticket_id: 1};
                    window.location.href = `./receipt.html?ticket-id=${result.ticket_id}`;
                }
            }
        )
    }

    $(".pay-btn").click(() => {
       setTicket();
    });

    getSummary();
});