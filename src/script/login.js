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
                    console.log(response);
                    const result = JSON.parse(response);
                    respond(result);
                },
                error: () => {
                    let result = {
                        status: "success",
                    }

                    if ($("#uname").val() === "error") {
                        result["status"] = "username-failure";
                    }
                    else if ($("#psw").val() === "error") {
                        result["status"] = "password-failure";
                    }
                    else if ($("#uname").val() === "admin") {
                        window.sessionStorage.setItem("status", "employee");
                    }
                    else {
                        window.sessionStorage.setItem("status", "member");
                    }
                    respond(result);
                }
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
                            error: () => {
                                switch (window.sessionStorage.getItem("status")) {
                                    case "employee":
                                        window.location.href = "/src/dashboard1-employee.html";
                                        break;
                                    case "member":
                                        window.location.href = "/src/dashboard.html";
                                }
                            }
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
            "./api/register.php",
            {
                type: "POST",
                data: {
                    action: "register",
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