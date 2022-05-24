<?php

include "login.php";

if (checkLogin()) {
    $plate = $_POST["plate"];
    $name = $_POST["name"];
    $email = $_SESSION["email"];

    $time = time();
    $conn->exec("INSERT INTO vehicles (plate, name, email, registerdate) VALUES ('$plate', '$name', '$email', '$time')");
    $id = $conn->lastInsertId();
    echo $id;
} else {
    echo "false";
}