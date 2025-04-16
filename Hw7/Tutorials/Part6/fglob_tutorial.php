<?php
// Create a test file with .log extension
$logfile = "test.log";
file_put_contents($logfile, "This is a test log file");
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>Finding Files with glob()</h1>

<?php
// Find all .txt files
echo "<h2>Finding all .txt files:</h2>";
$txtFiles = glob("*.txt");
echo "<ul>";
foreach ($txtFiles as $file) {
    echo "<li>$file</li>";
}
echo "</ul>";

// Find all .log files
echo "<h2>Finding all .log files:</h2>";
$logFiles = glob("*.log");
echo "<ul>";
foreach ($logFiles as $file) {
    echo "<li>$file</li>";
}
echo "</ul>";

// Find files starting with 'new'
echo "<h2>Finding files starting with 'new':</h2>";
$newFiles = glob("new*");
echo "<ul>";
foreach ($newFiles as $file) {
    echo "<li>$file</li>";
}
echo "</ul>";

// Multiple patterns
echo "<h2>Finding .txt OR .log files:</h2>";
$allFiles = glob("*.{txt,log}", GLOB_BRACE);
echo "<ul>";
foreach ($allFiles as $file) {
    echo "<li>$file</li>";
}
echo "</ul>";
?>

</body>
</html>