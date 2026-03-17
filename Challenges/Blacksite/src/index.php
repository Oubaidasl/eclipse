<?php
require 'config.php';

if (!isset($_SESSION['user'])){
    header('Location: create.php');
    exit();
}

$stmt = $pdo->query("SELECT * FROM notes ORDER BY created_at DESC");
$notes = $stmt->fetchAll();
?>

<!DOCTYPE html>
<html>

<head>
    <title>Research Logs</title>
</head>

<body>

    <h2>Blacksite</h2>

    <?php foreach ($notes as $note): ?>

        <div style="border:1px solid #ccc; padding:10px; margin-bottom:10px;">

            <h3><?php echo htmlspecialchars($note['title']); ?></h3>

            <p><strong>Researcher:</strong> <?php echo htmlspecialchars($note['researcher']); ?></p>

            <p><strong>Sector:</strong> <?php echo htmlspecialchars($note['sector']); ?></p>

            <p><?= $note['notes']; ?></p>

            <small><?php echo $note['created_at']; ?></small>

        </div>

    <?php endforeach; ?>

</body>

</html>