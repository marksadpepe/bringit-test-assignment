<?php
namespace Blog\Services;

class UserService {
  private static string $table_name = "users";

  public static function create(array $data): array {
    global $db;

    $name = $data["name"] ?? null;
    $email = $data["email"] ?? null;
    $age = $data["age"] ?? null;

    if (empty($name) || empty($email) || empty($age)) {
      throw new \Exception("400:User name, email and age must be specified");
    }

    $res = $db->query("select id from users where email = '{$email}'")["result"];
    $candidate = $res->fetch_assoc();
    if ($candidate) {
      throw new \Exception("409:User with email {$email} already exists");
    }

    if ($age < 13) {
      throw new \Exception("400:Age must be greater than 12");
    }

    $query = "insert into " . self::$table_name . "(name, email, age) values('{$name}', '{$email}', '{$age}')";
    $db->query($query);

    return [
      "success" => true,
    ];
  }
  
  public static function get_users(array $params): array {
    global $db;

    $idx = 0;
    $users = [];
    $page = (int)$params["page"];
    $limit = (int)$params["limit"];
    $searchEmail = $params["searchEmail"];

    $offset = ($page - 1) * $limit;
    $whereConditions = [self::$table_name . ".deletedAt is null"];

    if (!empty($searchEmail)) {
      $whereConditions[] = self::$table_name . ".email like '%{$searchEmail}%'";
    }

    $where = "where " . implode(" and ", $whereConditions);

    $query = "select " . self::$table_name . ".id, name, email, count(posts.id) as postCount from " . self::$table_name . " left join posts on " . self::$table_name . ".id = posts.authorId " . $where . " group by " . self::$table_name . ".id limit {$limit} offset {$offset}";

    $count_query = "select count(*) as total from " . self::$table_name;
    $cresult = $db->query($count_query)["result"];
    $total = (int)$cresult->fetch_assoc()["total"];
    $total_pages = $total > 0 ? (int)ceil($total / $limit) : 1;

    $qresult = $db->query($query)["result"];

    foreach($qresult as $user) {
      $users[$idx] = $user;
      $users[$idx]["postCount"] = (int)$users[$idx]["postCount"];
      $idx++;
    }

    $meta = [
      "total" => $total,
      "page" => $page,
      "limit" => $limit,
      "totalPages" => $total_pages,
      "hasNextPage" => $page < $total_pages,
      "hasPrevPage" => $page > 1,
    ];

    return ["data" => $users, "meta" => $meta];
  }

  public static function get_user_by_id(string $id): array {
    global $db;

    $query = "select id from " . self::$table_name . " where id = '{$id}' and deletedAt is null";

    $user = $db->query($query)["result"]->fetch_assoc();

    if (!$user) {
      throw new \Exception("404:User {$id} not found");
    }

    return $user;
  }
}
?>
