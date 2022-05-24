<?php

include "login.php";

if (checkLogin()) {
    $id = $_POST["id"];
    $conn->exec("DELETE FROM cards WHERE id = '$id'");
    echo "ok";
} else {
    echo "false";
}