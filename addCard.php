<?php

include "login.php";

if (checkLogin()) {
    $name = $_POST["name"];
    $owner = $_POST["owner"];
    $number = $_POST["number"];
    $cvv = $_POST["cvv"];
    $expiredate = $_POST["expiredate"];
    $email = $_SESSION["email"];

    $conn->prepare("INSERT INTO cards (email, name, owner, number, cvv, expiredate) VALUES (?, ?, ?, ?, ?, ?)")->execute([$email, $name, $owner, $number, $cvv, $expiredate]);
    echo "ok";
} else {
    echo "false";
}