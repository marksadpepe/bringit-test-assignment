<?php
namespace Blog\Controllers;

use Blog\Request;
use Blog\Response;
use Blog\Services\UserService;

class UserController {
  public static function create_user(Request $req, array $route_params): Response {
    $body = $req->get_body();
    try {
      $result = UserService::create($body);

      return Response::json(201, $result);
    } catch (\Exception $e) {
      [$status_code, $err_msg] = explode(":", $e->getMessage());
      return Response::json((int)$status_code, ["message" => $err_msg, "statusCode" => (int)$status_code]);
    }
  }

  public static function get_users(Request $req, array $route_params): Response {
    try {
      $users = UserService::get_users();
      
      return Response::json(200, $users);
    } catch (\Exception $e) {
      [$status_code, $err_msg] = explode(":", $e->getMessage());
      return Response::json((int)$status_code, ["message" => $err_msg, "statusCode" => (int)$status_code]);
    }
  }
}
?>
