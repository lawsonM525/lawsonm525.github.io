<!DOCTYPE html>
<html>
<head>
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>Reading Files in PHP</h1>

<?php
// Read entire file at once
echo "<h2>Reading entire file with readfile():</h2>";
readfile("sample.txt");

// Read file into array
echo "<h2>Reading file into array with file():</h2>";
$lines = file("sample.txt");
foreach($lines as $line_num => $line) {
    echo "Line #" . ($line_num + 1) . ": " . htmlspecialchars($line) . "<br>";
}

// Read file into string
echo "<h2>Reading file into string with file_get_contents():</h2>";
$content = file_get_contents("sample.txt");
echo "<p>" . nl2br($content) . "</p>";
?>

</body>
</html>