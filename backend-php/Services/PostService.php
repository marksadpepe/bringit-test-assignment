<?php
namespace Blog\Services;

use Blog\Services\UserService;

class PostService {
  private static string $table_name = "posts";

  public static function create(array $data): array {
    global $db;

    $title = $data["title"] ?? null;
    $content = $data["content"] ?? null;
    $authorId = $data["authorId"] ?? null;

    if (empty($title) || empty($content) || empty($authorId)) {
      throw new \Exception("400:Post title, content and authorId must be specified");
    }
  
    try {
      $user = UserService::get_user_by_id($authorId);
    } catch (\Exception $e) {
      throw $e;
    }
  
    $id = bin2hex(random_bytes(16));
    $now = date('Y-m-d H:i:s');

    $query = "insert into " . self::$table_name . "(id, title, content, authorId, createdAt, updatedAt) values ('{$id}', '{$title}', '{$content}', '{$authorId}', '{$now}', '{$now}')";
    $db->query($query);
  
    return ["success" => true];
  }

  public static function get_posts(array $params): array {
    global $db;

    $idx = 0;
    $posts = [];
    $page = (int)$params["page"];
    $limit = (int)$params["limit"];
    $searchTitle = $params["searchTitle"];

    $offset = ($page - 1) * $limit;
    $whereConditions = [self::$table_name . ".deletedAt is null"];

    if (!empty($searchTitle)) {
      $whereConditions[] = self::$table_name . ".title like '%{$searchTitle}%'";
    }

    $where = "where " . implode(" and ", $whereConditions);

    $query = "select " . self::$table_name . ".id, title, users.id as author_id, users.name as author_name from " . self::$table_name . " inner join users on " . self::$table_name . ".authorId = users.id " . $where;

    $qresult = $db->query($query)["result"];

    foreach($qresult as $post) {
      $postAuthor = ["id" => $post["author_id"], "name" => $post["author_name"]];
      $postItem = ["id" => $post["id"], "title" => $post["title"], "author" => $postAuthor];
      $posts[$idx] = $postItem;

      $idx++;
    }

    $count_query = "select count(*) as total from " . self::$table_name . " " . $where;
    $cresult = $db->query($count_query)["result"];
    $total = (int)$cresult->fetch_assoc()["total"];
    $total_pages = $total > 0 ? (int)ceil($total / $limit) : 1;

    $meta = [
      "total" => $total,
      "page" => $page,
      "limit" => $limit,
      "totalPages" => $total_pages,
      "hasNextPage" => $page < $total_pages,
      "hasPrevPage" => $page > 1,
    ];

    return ["data" => $posts, "meta" => $meta];
  }
}
?>
