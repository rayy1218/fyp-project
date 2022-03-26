<?php

$url = "localhost/src/api/payment.php";
$token = "abc123";

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, "action=pay-ticket&id=" . $_POST["ticket-id"] . "&token=" . $token);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

echo curl_exec($ch);
curl_close($ch);