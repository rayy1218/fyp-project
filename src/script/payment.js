$(document).ready(() => {
    const URLSearch = new URLSearchParams(window.location.search)

    function getSummary() {
        $.ajax(
            `./api/payment.php?action=get-summary`,
            {
                data: {
                    "ticket-id": URLSearch.get("ticket-id")
                },
                success: (response) => {
                    print(response)
                }
            }
        )
        function print(result) {
            let append = ""

            let seat_str = "", first = true
            for (let seat of result["seats"]) {
                if (first) {
                    seat_str += `R${seat["seat_row"]}C${seat["seat_column"]}`
                    first = false;
                }
                else {
                    seat_str += `, R${seat["seat_row"]}C${seat["seat_column"]}`
                }
            }

            append += `<div class="row"><div class="col-4">Movie Name</div><div class="col">${result["ticket"]["movie_title"]}</div></div>`
            append += `<div class="row"><div class="col-4">Seat</div><div class="col">${seat_str}</div></div>`
            append += `<div class="row"><div class="col-4">Ticket Amount</div><div class="col">Adult: ${result["ticket"]["ticket_adult_num"]}, Child/Elder: ${result["ticket"]["ticket_child_elder_num"]}, Student: ${result["ticket"]["ticket_student_num"]}</div></div>`
            append += `<div class="row"><div class="col-4">Payment</div><div class="col">RM${result["ticket"]["ticket_payment_amount"]}</div></div>`

            $("#summary").append(append)
        }
    }

    $(".pay-btn").click(() => {
        window.open("/src/dummy-third-party-payment/dummy-pay.php?ticket-id=" + URLSearch.get("ticket-id"));
        window.location.href = "/src/dashboard.html"
    });

    getSummary()
});