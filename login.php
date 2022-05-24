<?php

session_start();

$servername = "localhost";
$username = "root";
$password = "";

$conn = new PDO("mysql:host=$servername;dbname=mobilotopark", $username, $password);
$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

function checkLogin() {
    if (isset($_SESSION["email"]) && isset($_SESSION["password"])) {
        return true;
    } else {
        return false;
    }
}