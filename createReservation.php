<?php

include "login.php";

if (checkLogin()) {
    $email = $_SESSION["email"];
    $vehicleid = $_POST["vehicleid"];
    $parkid = $_POST["parkid"];
    $date = $_POST["time"];

    $conn->exec("UPDATE `vehicles` SET currentpark = '$parkid' WHERE id = '$vehicleid'");
    $conn->exec("UPDATE `parks` SET emptyslots = emptyslots - 1 WHERE id = '$parkid'");
    $conn->exec("INSERT INTO `reservations` (`vehicleid`, `parkid`, `email`, `date`) VALUES ('$vehicleid', '$parkid', '$email', '$date')");
    $id = $conn->lastInsertId();
    echo $id;
} else {
    echo "false";
}