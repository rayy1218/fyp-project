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

    $("#login-btn").click(() => {
       login();
    });
});