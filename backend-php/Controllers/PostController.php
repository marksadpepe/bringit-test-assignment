<?php
namespace Blog\Controllers;

use Blog\Request;
use Blog\Response;
use Blog\Services\PostService;

class PostController {
  public static function create_post(Request $req, array $route_params): Response {
    $body = $req->get_body();
    try {
      $result = PostService::create($body);
  
      return Response::json(201, $result);
    } catch (\Exception $e) {
      [$status_code, $err_msg] = explode(":", $e->getMessage());
      
      return Response::json((int)$status_code, ["message" => $err_msg, "statusCode" => (int)$status_code]);
    }
  }

  public static function get_posts(Request $req, array $route_params): Response {
    try {
      $posts = PostService::get_posts();

      return Response::json(200, $posts);
    } catch (\Exception $e) {
      [$status_code, $err_msg] = explode(":", $e->getMessage());
      return Response::json((int)$status_code, ["message" => $err_msg, "statusCode" => (int)$status_code]);
    }
  }
}
?>
