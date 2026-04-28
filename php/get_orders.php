<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once 'db_config.php';

try {
    $stmt = $pdo->query("SELECT * FROM rendelesek ORDER BY datum DESC");
    $orders = $stmt->fetchAll();

    foreach ($orders as &$order) {
        $itemStmt = $pdo->prepare("SELECT * FROM rendeles_tetelek WHERE rendeles_id = ?");
        $itemStmt->execute([$order['id']]);
        $order['items'] = $itemStmt->fetchAll();
    }

    echo json_encode($orders);
} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>