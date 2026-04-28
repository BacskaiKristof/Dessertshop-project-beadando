<?php
$host = 'sql213.infinityfree.com';
$db   = 'if0_41761796_cukraszda';
$user = 'if0_41761796';
$pass = 'RdB8K8oR8S'; 
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
   
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION, 
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    header('Content-Type: application/json');
    die(json_encode(['error' => "Adatbázis hiba: " . $e->getMessage()]));
}
?>