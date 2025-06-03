<?php
namespace Blog\Services;

use Blog\Services\Role;
use Blog\Services\UserRole;

class UserService {
  private static string $table_name = "users";

  public static function create(string $name, string $email, int $age): array {
    global $db;

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
  
  public static function get_users(): array {
    global $db;

    $idx = 0;
    $users = [];

    $query = "select " . self::$table_name . ".id, name, email, count(posts.id) as postCount from " . self::$table_name . " left join posts on " . self::$table_name . ".id = posts.authorId where " . self::$table_name . ".deletedAt is null group by " . self::$table_name . ".id";

    $qresult = $db->query($query)["result"];

    foreach($qresult as $user) {
      $users[$idx] = $user;
      $users[$idx]["postCount"] = (int)$users[$idx]["postCount"];
      $idx++;
    }

    return $users;
  }
}
?>
