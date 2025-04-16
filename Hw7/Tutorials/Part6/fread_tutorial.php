<?php
$filename = "notes.txt";
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>Reading Files with fread()</h1>

<?php
// Open file for reading
$file = fopen($filename, "r");

// Read first 20 bytes
echo "<h2>Reading first 20 bytes:</h2>";
$content = fread($file, 20);
echo "<p>" . htmlspecialchars($content) . "</p>";

// Move back to start of file
rewind($file);

// Read entire file
echo "<h2>Reading entire file:</h2>";
$filesize = filesize($filename);
$content = fread($file, $filesize);
echo "<pre>" . htmlspecialchars($content) . "</pre>";

// Close the file
fclose($file);
?>

</body>
</html>