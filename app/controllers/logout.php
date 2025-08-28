<?php
require_once(__DIR__ . '/../config/dirs.php');
require_once(CONTROLLERS_PATH . '/AuthController.php');

$auth = new AuthController();
$auth->logout();
