<?php

include "login.php";

if (checkLogin()) {
    $id = $_POST["id"];
    $email = $_SESSION["email"];

    $balance = $conn->query("SELECT balance FROM users WHERE email = '$email'")->fetch()["balance"];
    $reservation = $conn->query("SELECT * FROM reservations WHERE id = '$id'")->fetch();
    $parkid = $reservation["parkid"];
    $cost = $conn->query("SELECT cost FROM parks WHERE id = '$parkid'")->fetch()["cost"];

    $passedtime = round((time() * 1000 - $reservation["date"]) / 3600000);
    $totalcost = $cost * $passedtime;

    if ($totalcost < $cost) {
        $totalcost = $cost;
    }

    if ($balance >= $totalcost) {
        $conn->prepare("UPDATE users SET balance = ? WHERE email = ?")->execute([$balance - $totalcost, $email]);
        $conn->prepare("DELETE FROM reservations WHERE id = ?")->execute([$id]);
        $conn->prepare("UPDATE vehicles SET currentpark = ? WHERE id = ?")->execute([null, $reservation["vehicleid"]]);
        $conn->prepare("UPDATE parks SET emptyslots = emptyslots + 1 WHERE id = ?")->execute([$reservation["parkid"]]);
        echo "true";
    } else {
        echo "false";
    }
} else {
    echo "false";
}