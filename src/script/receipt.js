$(document).ready(() => {
    const URLSearch = new URLSearchParams(window.location.search)
    const ticket_id = URLSearch.get("ticket-id")

    function getReceipt() {
        $.ajax(
            `./api/receipt.php?action=get-receipt&ticket-id=${ticket_id}`,
            {
                success: (response) => {
                    print(response)
                },
            }
        )

        function print(result) {
            $("#member-name-placeholder").html(result.member_username)
            $("#payment-amount-placeholder").html(`RM ${result.ticket_payment_amount}`)
            $("#movie-name-placeholder").html(result.movie_title)
            $("#censorship-rating-placeholder").html(result.movie_censorship_rating)
            $("#cinema-address-placeholder").html(result.cinema_address)
            $("#theater-name-placeholder").html(result.theater_name)
            $("#date-placeholder").html(result.scheduled_movie_showing_date)
            $("#time-placeholder").html(result.scheduled_movie_start_time)
            $("#ticket-amount-placeholder").html(`Total: ${result.ticket_adult_num + result.ticket_child_elder_num + result.ticket_student_num} (Adult: ${result.ticket_adult_num} Child/Elder: ${result.ticket_child_elder_num} Student: ${result.ticket_student_num})`)
            $("#ticket-token").html(result.ticket_token)
        }
    }

    $("#send-email-btn").click(function sendEmail() {
        $.ajax(
            `./api/receipt.php?action=send-email&ticket-id=${ticket_id}`,
            {
                success: () => {
                    $("#send-email-btn").html("Sent")
                    $("#send-email-btn").prop('disabled', true)
                },
                error: () => {
                    $("#send-email-btn").html("Sent")
                    $("#send-email-btn").prop('disabled', true)

                }
            }
        );
    });

    getReceipt()
});