<?php
namespace Blog\Controllers;

use Blog\Request;
use Blog\Response;
use Blog\Services\PostService;

class PostController {
  public static function create_post(Request $req, array $route_params): Response {
    $body = $req->get_body();

    if (!$body) {
      return Response::json(400, ["message" => "Request body is required", "statusCode" => 400]);
    }

    try {
      $result = PostService::create($body);
  
      return Response::json(201, $result);
    } catch (\Exception $e) {
      [$status_code, $err_msg] = explode(":", $e->getMessage());
      
      return Response::json((int)$status_code, ["message" => $err_msg, "statusCode" => (int)$status_code]);
    }
  }

  public static function get_posts(Request $req, array $route_params): Response {
    $params = [
      "page" => $req->get_query_param("page") ?? 1,
      "limit" => $req->get_query_param("limit") ?? 10,
      "searchTitle" => $req->get_query_param("searchTitle") ?? null,
    ];

    try {
      $posts = PostService::get_posts($params);

      return Response::json(200, $posts);
    } catch (\Exception $e) {
      [$status_code, $err_msg] = explode(":", $e->getMessage());

      return Response::json((int)$status_code, ["message" => $err_msg, "statusCode" => (int)$status_code]);
    }
  }
}
?>
