<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

function email($to_email, $subject, $body) {
    $mail = new PHPMailer(true);

    //Send mail using gmail
    $mail->IsSMTP(); // telling the class to use SMTP
    $mail->Mailer = "smtp";
    $mail->SMTPDebug = 0;
    $mail->SMTPAuth = true; // enable SMTP authentication
    $mail->SMTPSecure = "tls"; // sets the prefix to the server
    $mail->Host = "smtp.gmail.com"; // sets GMAIL as the SMTP server
    $mail->Port = 587; // set the SMTP port for the GMAIL server
    $mail->Username = "cinemaemail1234@gmail.com"; // GMAIL username
    $mail->Password = "cinemaemail12"; // GMAIL password


    //Typical mail data
    try{
        $mail->AddAddress($to_email);
        $mail->SetFrom("cinemaemail1234@gmail.com", "Cinema Website");
        $mail->isHTML();
        $mail->Subject = $subject;
        $mail->Body = $body;

        $mail->Send();
    }
    catch(Exception $e){
        echo $mail->ErrorInfo;
    }
}