<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <title>Otopark Rezervasyon</title>
    <link rel="stylesheet" href="static/css/main.css">
    <link rel="stylesheet" href="static/css/vehicle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"/>
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
<?php
include "login.php";

$login = checkLogin();

if ($login == true) {
    $email = $_SESSION["email"];
    $user = $conn->query("SELECT * FROM users WHERE email = '$email'")->fetch();
    $vehicles = $conn->query("SELECT * FROM vehicles WHERE email = '$email'")->fetchAll();

    ?>
    <div id="main-wrap"></div>
    <script>
        <?php 
        echo "const user = " . json_encode($user) . ";";
        echo "const vehicles = ". json_encode($vehicles) . ";";
        ?>
    </script>
    <script src="static/js/main.js"></script>
    <script>gotoPage("vehicles.html")</script>
    <?php
} else {
    ?>
    <div id="main-wrap">
        <div id="login-wrap">
            <div class="loginbox">
                <img src="static/img/logo.png" class="avatar">
                <h1>Mobil Otopark</h1>
                <p>E-mail</p>
                <input type="text" id="email" value="dev">
                <div id="password-wrap">
                    <p>Şifre</p>
                    <input type="password" id="pass" value="123">
                </div>
                <input type="submit" value="Giriş Yap" onclick="loginAttempt(event)">
                <div class="login-wrap2">
                    <a href="forgotpass.php">Şifremi Unuttum!</a>
                    <a href="register.php">Hesabın yok mu?</a>
                </div>
            </div>
        </div>
    </div>
    <script src="static/js/login.js?asd"></script>
    <?php
}
?>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</body>
</html>