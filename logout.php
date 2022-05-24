<?php

session_start();

unset($_SESSION["email"]);
unset($_SESSION["password"]);

echo "ok";