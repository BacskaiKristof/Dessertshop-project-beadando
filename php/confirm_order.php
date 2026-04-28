<?php
header('Content-Type: application/json');
require_once 'db_config.php';

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || empty($data['items'])) {
    echo json_encode(['success' => false, 'message' => 'Üres kosár']);
    exit;
}

try {
    $pdo->beginTransaction();

    $stmt = $pdo->prepare("INSERT INTO rendelesek (osszertek) VALUES (?)");
    $stmt->execute([$data['total']]);
    $rendeles_id = $pdo->lastInsertId();

    $stmt = $pdo->prepare("INSERT INTO rendeles_tetelek (rendeles_id, suti_nev, mennyiseg, ar) VALUES (?, ?, ?, ?)");
    foreach ($data['items'] as $item) {
        $stmt->execute([
            $rendeles_id,
            $item['name'],
            $item['quantity'],
            $item['price']
        ]);
    }

    $pdo->commit();
    echo json_encode(['success' => true, 'order_id' => $rendeles_id]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>