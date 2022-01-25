$(document).ready(() => {
    const URLSearch = new URLSearchParams(window.location.search);
    const ticket_id = URLSearch.get("ticket-id");

    function getReceipt() {
        $.ajax(
            `./api/receipt.php?action=get-receipt&ticket_id=${ticket_id}`,
            {
                success: (response) => {
                    const result = JSON.parse(response);
                    print(result);
                },
                error: () => {
                    const result = {
                        member_name: "john",
                        ticket_payment_amount: 15,
                        movie_name: "Good Movie",
                        movie_censorship_rating: "PG13",
                        cinema_address: "Cinema 1",
                        theater_name: "Theater 1",
                        scheduled_movie_showing_date: "12-12-2022",
                        scheduled_movie_start_time: "2000",
                        ticket_adult_num: 3,
                        ticket_child_elder_num: 0,
                        ticket_student_num: 0,
                        ticket_token: "(Barcode or QRcode)"
                    }
                    print(result);
                }
            }
        )

        function print(result) {
            $("#member-name-placeholder").html(result.member_name);
            $("#payment-amount-placeholder").html(`RM ${result.ticket_payment_amount}`);
            $("#movie-name-placeholder").html(result.movie_name);
            $("#censorship-rating-placeholder").html(result.movie_censorship_rating);
            $("#cinema-address-placeholder").html(result.cinema_address);
            $("#theater-name-placeholder").html(result.theater_name);
            $("#date-placeholder").html(result.scheduled_movie_showing_date);
            $("#time-placeholder").html(result.scheduled_movie_start_time);
            $("#ticket-amount-placeholder").html(`Total: ${result.ticket_adult_num + result.ticket_child_elder_num + result.ticket_student_num} (Adult: ${result.ticket_adult_num} Child/Elder: ${result.ticket_child_elder_num} Student: ${result.ticket_student_num})`);
            $("#ticket-token").html(result.ticket_token);
        }
    }

    $("#send-email-btn").click(function sendEmail() {
        $.ajax(
            `./api/receipt.php?action=send-email&ticket_id=${ticket_id}`,
            {
                success: () => {
                    $("#send-email-btn").html("Sent");
                    $("#send-email-btn").prop('disabled', true);
                },
                error: () => {
                    $("#send-email-btn").html("Sent");
                    $("#send-email-btn").prop('disabled', true);

                }
            }
        );
    });

    getReceipt();
});