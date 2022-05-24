<?php

include "login.php";

if (checkLogin()) {
    $amount = $_POST["amount"];
    $email = $_SESSION["email"];

    $conn->prepare("UPDATE users SET balance = balance + ? WHERE email = ?")->execute([$amount, $email]);
    echo "ok";
} else {
    echo "false";
}