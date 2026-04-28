<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
require_once 'db_config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['id'])) {
    try {
        $pdo->beginTransaction();
        
        $stmt1 = $pdo->prepare("DELETE FROM rendeles_tetelek WHERE rendeles_id = ?");
        $stmt1->execute([$data['id']]);
        
        $stmt2 = $pdo->prepare("DELETE FROM rendelesek WHERE id = ?");
        $stmt2->execute([$data['id']]);
        
        $pdo->commit();
        echo json_encode(["success" => true]);
    } catch (Exception $e) {
        $pdo->rollBack();
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
}
?>