const URLSearch = new URLSearchParams(window.location.search)
const token = URLSearch.get("token")

$(document).ready(() => {
    function login() {
        $.ajax(
            `/src/api/login.php`,
            {
                type: "POST",
                data: {
                    action: "login",
                    username: $("#uname").val(),
                    password: $("#psw").val()
                },
                success: (response) => {
                    respond(response)
                },
            }
        );

        function respond(result) {
            switch (result.status) {
                case "success":
                    $.ajax(
                        "/src/api/login.php",
                        {
                            data: {
                                action: "get-user-status",
                            },
                            success: (response) => {
                                switch (response["status"]) {
                                    case "employee":
                                        window.location.href = "/src/dashboard1-employee.html"
                                        break
                                    case "member":
                                        window.location.href = "/src/dashboard.html"
                                }
                            },
                        }
                    );
                    break

                case "username-failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Username failure</div>')
                    break

                case "password-failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Password failure</div>')
                    break
            }
        }
    }

    function register() {
        $.ajax(
            "/src/api/login.php",
            {
                type: "POST",
                data: {
                    action: "register",
                    username: $("#uname").val(),
                    email: $("#email").val(),
                    password: $("#psw").val(),
                    "re-password": $("#psw2").val(),
                    "phone-num": $("#phone").val()
                },

                success: (response) => {
                    respond(response)
                },
            }
        );

        function respond(result) {
            console.log(result.status)
            switch (result.status) {
                case "success":
                    window.location.href = "login.html"
                    break;

                case "password-format-failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Password Format Failure</div>')
                    break

                case "re-password-failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Re-entered password did not match</div>')
                    break

                case "username-failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Username existed</div>')
                    break
            }
        }
    }

    function sendResetPassMail() {
        $.ajax(
            "/src/api/login.php",
            {
                type: "POST",
                data: {
                    action: "forget-password",
                    username: $("#uname").val()
                },
                success: (response) => {
                    respond(response)
                }
            }
        )

        function respond(response) {
            switch (response["status"]) {
                case "success":
                    $("#error-placeholder").html(`<div class="alert alert-success" role="alert">Please check your email for reset password request</div>`)
                    break

                case "username-failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Username not existed</div>')
                    break
            }
        }
    }

    function resetPassword() {
        $.ajax(
            "/src/api/login.php",
            {
                type: "POST",
                data: {
                    action: "reset-password",
                    password: $("#password").val(),
                    token: token
                },
                success: (response) => {
                    respond(response)
                }
            }
        )

        function respond(response) {
            console.log(response)
            switch(response["status"]) {
                case "success":
                    $("#error-placeholder").html(`<div class="alert alert-success" role="alert">Password was reset</div>`)
                    break

                case "token-failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Token was not valid</div>')
                    break
            }
        }
    }

    $("#register-btn").click(() => {
       register()
    })

    $("#login-btn").click(() => {
       login()
    })

    $("#send-request-btn").click(() => {
        sendResetPassMail()
    })

    $("#reset-password-btn").click(() => {
        resetPassword()
    })
});