<?php

include "login.php";

$email = $_POST["email"];
$password = $_POST["password"];

$response = $conn->query("SELECT * FROM users WHERE email = '$email' AND password = '$password'")->fetch();

if ($response) {
    $_SESSION["email"] = $email;
    $_SESSION["password"] = $password;
    echo "true";
} else {
    echo "false";
}