$(document).ready(() => {
    function login() {
        $.ajax(
            `./api/login.php`,
            {
                type: "POST",
                data: {
                    action: "login",
                    username: $("#uname").val(),
                    password: $("#psw").val()
                },
                success: (response) => {
                    respond(response);
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
                                        window.location.href = "/src/dashboard1-employee.html";
                                        break;
                                    case "member":
                                        window.location.href = "/src/dashboard.html";
                                }
                            },
                        }
                    );
                    break;

                case "username-failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Username failure</div>');
                    break;

                case "password-failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Password failure</div>');
                    break;
            }
        }
    }

    function register() {
        $.ajax(
            "./api/login.php",
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
                    const result = JSON.parse(response);
                    respond(result);
                },
            }
        );

        function respond(result) {
            switch (result.status) {
                case "success":
                    window.location.href = "login.html";
                    break;

                case "password-format-failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Password Format Failure</div>');
                    break;

                case "re-password-failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Re-entered password did not match</div>');
                    break;

                case "username-failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Username existed</div>');
                    break;
            }
        }
    }

    $("#register-btn").click(() => {
       register();
    });

    $("#login-btn").click(() => {
       login();
    });
});