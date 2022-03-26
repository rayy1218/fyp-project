<!DOCTYPE html>
<html lang="en">
<head>
	<!-- Required meta tags -->
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<!-- Bootstrap CSS -->
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
	<title>Dummy Pay</title>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="/src/script/prototype-tool.js"></script>
</head>
<body>
<div class="position-absolute top-50 start-50 translate-middle border rounded p-2">
	<div class="container">
		<form>
			<div id="error-placeholder"></div>
			<div class="form-group">
				<label for="user">Username</label>
				<input class="form-control" type="text" placeholder="Enter username" id="user" name="user" required>
				<label for="password">Password</label>
				<input class="form-control" type="text" placeholder="Enter password" id="password" name="password" required>
			</div>

			<div class="mt-3"><button class="btn btn-primary w-100" type="button" id="pay-btn">Pay</button></div>
		</form>
	</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
<script>
    const URLSearch = new URLSearchParams(window.location.search)

		$("#pay-btn").click(() => {
				$.ajax(
						"./pay.php",
						{
								type: "POST",
								data: {
										"ticket-id": URLSearch.get("ticket-id")
								},
                success: () => {
                    $("#error-placeholder").html(`<div class="alert alert-success" role="alert">Success</div>`)
                }
						}
				)
		})
</script>
</body>
</html>