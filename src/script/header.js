$(document).ready(() => {
    function setUserTab() {
        $.ajax(
            "/src/api/login.php",
            {
                data: {
                    action: "get-user-status",
                },
                success: (response) => {
                    print(response);
                },
            }
        );

        function print(result) {
            const status = result["status"];
            switch (status) {
                case "guest":
                    $("#header-right").html(`
                        <a class="btn" href="/src/register.html">Register</a>
                        <a class="btn" href="/src/login.html">Login</a>
                    `);

                    $("#nav-list").append(`
                        <li><a class="btn" href="/src/register.html">Register</a></li>
                        <li><a class="btn" href="/src/login.html">Login</a></li>
                    `);
                    break;

                case "member":
                    $("#header-right").html(`
                        <a href="/src/dashboard.html?member-id=${result["member_id"]}" class="btn">Dashboard</a>
                        <button class="btn logout-btn">Logout</button>
                    `);

                    $("#nav-list").append(`
                        <li><a href="/src/dashboard.html?member-id=${result["member_id"]}" class="btn">Dashboard</a><li>
                        <li><button class="btn logout-btn">Logout</button><li>
                    `);
                    break;

                case "employee":
                    $("#header-right").html(`
                        <a href="/src/dashboard1-employee.html?member-id=${result["member_id"]}" class="btn">Dashboard</a>
                        <button class="btn logout-btn">Logout</button>
                    `);

                    $("#nav-list").append(`
                        <li><a href="/src/dashboard1-employee.html" class="btn">Dashboard</a><li>
                        <li><button class="btn logout-btn">Logout</button><li>
                    `);
                    break;
            }

            $(".logout-btn").click(() => {
                logout();
            });
        }

    }

    function logout() {
        $.ajax(
            "/src/api/login.php",
            {
                data: {
                    action: "logout",
                },
                success: (response) => {
                    window.location.href = "/index.html";
                },
            }
        );
    }

    setUserTab();
});