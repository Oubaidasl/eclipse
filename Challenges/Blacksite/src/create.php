<?php
require 'config.php';
$FLAG = getenv('FLAG') ?: 'ECLIPSE{y0u_f0und_1t}';

// login
$users = ['researcher' => 'lab2024', 'admin' => 'eclipse'];
$error = '';

if (isset($_POST['login'])) {
    if (isset($users[$_POST['user']]) && $users[$_POST['user']] === $_POST['pass']) {
        $_SESSION['user'] = $_POST['user'];
    } else {
        $error = 'Invalid credentials.';
    }
}

if (isset($_GET['logout'])) {
    session_destroy(); header('Location: /'); exit;
}

// handle submission — VULNERABLE: summary rendered via eval
$preview = '';
if (isset($_POST['submit']) && isset($_SESSION['user'])) {
    $title      = htmlspecialchars($_POST['title'] ?? '');
    $researcher = htmlspecialchars($_POST['researcher'] ?? '');
    $sector     = htmlspecialchars($_POST['sector'] ?? '');
    $notes      = $_POST['notes'] ?? ''; // ← raw, no escaping

  // ⚠ CTF VULN: eval-based template, notes injected unescaped
  // try: <?= $FLAG ? or ?= system('id') ?

  $stmt = $pdo->prepare("INSERT INTO notes (user, title, researcher, sector, notes) VALUES (:user, :title, :researcher, :sector, :notes)");

  $stmt->execute([
    ':user' => $_SESSION['user'],
    ':title' => $title,
    ':researcher' => $researcher,
    ':sector' => $sector,
    ':notes' => $notes
  ]);
  exec("docker exec lab_bot node /app/bot.js / > /dev/null 2>&1 &");

}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Blacksite Lab — Experiment Submission</title>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/css/style.css">
</head>
<body>

<?php if (!isset($_SESSION['user'])): ?>

<!-- LOGIN -->
<div class="login-page">
  <div class="login-box">
    <div class="logo">BLACKSITE LAB</div>
    <p class="logo-sub">Internal Experiment Portal</p>
    <?php if ($error): ?>
      <div class="msg-error"><?= htmlspecialchars($error) ?></div>
    <?php endif; ?>
    <form method="POST">
      <input type="hidden" name="login" value="1">
      <label>Username</label>
      <input type="text" name="user" placeholder="researcher" autocomplete="off">
      <label>Password</label>
      <input type="password" name="pass" placeholder="••••••••">
      <button type="submit">Login</button>
    </form>
    <p class="footer-note">Authorized personnel only · All access is logged</p>
  </div>
</div>

<?php else: ?>

<!-- APP -->
<header>
  <span class="site-name">BLACKSITE LAB</span>
  <nav>
    <span>Experiment Submission</span>
  </nav>
  <a href="?logout" class="logout">Logout (<?= htmlspecialchars($_SESSION['user']) ?>)</a>
</header>

<main>
  <div class="layout">

    <!-- FORM -->
    <div class="panel">
      <h2>Submit Experiment Report</h2>
      <form method="POST">
        <input type="hidden" name="submit" value="1">

        <label>Experiment Title</label>
        <input type="text" name="title" placeholder="e.g. Cryogenic stability test" value="<?= htmlspecialchars($_POST['title'] ?? '') ?>">

        <label>Lead Researcher</label>
        <input type="text" name="researcher" placeholder="e.g. Dr. Elias Ward" value="<?= htmlspecialchars($_POST['researcher'] ?? '') ?>">

        <label>Sector</label>
        <select name="sector">
          <option>Sector A — Bio Systems</option>
          <option>Sector B — Signal Processing</option>
          <option>Sector C — Thermal Chamber</option>
          <option>Sector D — Restricted Testing</option>
        </select>

        <label>
          Experiment Notes
          <small>// template expressions supported</small>
        </label>
        <textarea name="notes" rows="8" placeholder="Describe your experiment observations, results, or notes..."><?= htmlspecialchars($_POST['notes'] ?? '') ?></textarea>

        <button type="submit">Submit Record</button>
      </form>
    </div>

    <!-- SIDEBAR + PREVIEW -->
    <div class="side">

      <div class="panel status-panel">
        <h3>System Status</h3>
        <div class="status-row"><span class="dot green"></span> Archive Node: Online</div>
        <div class="status-row"><span class="dot green"></span> Submission Queue: Stable</div>
        <div class="status-row"><span class="dot amber"></span> Sector D: Restricted</div>
        <div class="status-row"><span class="dot red"></span> Containment: Offline</div>
      </div>


    </div>
  </div>
</main>


<?php endif; ?>
</body>
</html>
