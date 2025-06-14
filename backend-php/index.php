<?php
require_once __DIR__ . "/bootstrap.php";
require_once __DIR__ . "/config.php";
$router = require __DIR__ . "/routes.php";

use Blog\Database;
use Blog\Request;
use Blog\Response;

$db = new Database(
  $DB_HOST,
  $DB_USERNAME,
  $DB_PASSWORD,
  $DB_NAME,
  $DB_PORT
);

header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header('Access-Control-Max-Age: 3600');
header('Access-Control-Allow-Headers: Cookie, Content-Type, Access-Control-Allow-Headers, Authorization');
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Origin: {$ORIGIN}");

$request = new Request();
$response = $router->route($request);
if ($response) {
  $response->send();
}
?>
