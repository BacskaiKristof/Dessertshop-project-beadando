<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
require_once 'db_config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id']) && isset($data['statusz'])) {
    try {
        $stmt = $pdo->prepare("UPDATE rendelesek SET statusz = ? WHERE id = ?");
        $stmt->execute([$data['statusz'], $data['id']]);
        echo json_encode(["success" => true]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}
?>