<?php
header('Content-Type: application/json');
require_once 'db_config.php';

try {
    $query = "
        SELECT 
            s.id, 
            s.nev, 
            s.tipus, 
            a.ertek as ar, 
            a.egyseg,
            GROUP_CONCAT(t.mentes SEPARATOR ', ') as mentes_info
        FROM suti s
        LEFT JOIN ar a ON s.id = a.sutiid
        LEFT JOIN tartalom t ON s.id = t.sutiid
        GROUP BY s.id
    ";

    $stmt = $pdo->query($query);
    $products = $stmt->fetchAll();

    foreach ($products as &$p) {
        $p['ar'] = $p['ar'] ?? 0;
        $p['egyseg'] = $p['egyseg'] ?? 'db';
        $p['image_url'] = "https://plus.unsplash.com/premium_photo-1664478254358-fb8ce668dca6?q=80&w=400&auto=format&fit=crop";
    }

    echo json_encode($products);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>