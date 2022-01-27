$(document).ready(() => {
    function login() {
        $.ajax(
            `./api/login.php`,
            {
                type: "POST",
                data: {
                    username: $("#uname").val(),
                    password: $("#psw").val()
                },
                success: (response) => {
                    console.log(response);
                    const result = JSON.parse(response);
                    respond(result);
                },
                error: () => {
                    const result = {
                        status: "success",
                        user_id: 1
                    }
                    respond(result);
                }
            }
        );
        function respond(result) {
            switch (result.status) {
                case "success":
                    window.sessionStorage.setItem("user_id", result.user_id);
                    window.location.href = "./dashboard.html";
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
            "./api/register.php",
            {
                type: "POST",
                data: {
                    username: $("#uname").val(),
                    email: $("#email").val(),
                    password: $("#psw").val(),
                    re_password: $("#psw2").val(),
                    phone_num: $("#phone").val()
                },

                success: (response) => {
                    const result = JSON.parse(response);
                    respond(result);
                },

                error: () => {
                    const result = {
                        status: "success",
                    }
                    respond(result)
                }
            }
        );

        function respond(result) {
            switch (result.status) {
                case "success":
                    window.location.href = "login.html";
                    break;

                case "password_format_failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Password Format Failure</div>');
                    break;

                case "re_password_failure":
                    $("#error-placeholder").html('<div class="alert alert-warning" role="alert">Re-entered password did not match</div>');
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