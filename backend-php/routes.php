<?php
namespace Blog;

use Blog\Router;

$router = new Router();
$router->set_namespace("Blog\\Controllers");

$router->post("/users", null, "UserController::create_user");
$router->get("/users", null, "UserController::get_users");

// $router->post("/posts", null, "PostController::create_post");
// $router->get("/posts", null, "PostController::get_posts");

return $router;
?>
