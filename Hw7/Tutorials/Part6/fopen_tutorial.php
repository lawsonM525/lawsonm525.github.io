<?php
$filename = "notes.txt";
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>Opening Files with fopen()</h1>

<?php
// Open file for reading
$file = fopen($filename, "r");
echo "<p>Opened '$filename' in read mode</p>";

// Check if file was opened successfully
if ($file) {
    echo "<p style='color: green'>File opened successfully!</p>";
    fclose($file);
} else {
    echo "<p style='color: red'>Error opening file!</p>";
}

// Demonstrate different modes
echo "<h2>Common fopen() modes:</h2>";
echo "<ul>";
echo "<li>'r' - Read only</li>";
echo "<li>'w' - Write only (file truncated)</li>";
echo "<li>'a' - Write only (append)</li>";
echo "<li>'r+' - Read and write</li>";
echo "</ul>";
?>

</body>
</html>