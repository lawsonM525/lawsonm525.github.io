<?php
$filename = "notes.txt";
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>Closing Files with fclose()</h1>

<?php
// Open file
$file = fopen($filename, "r");

if ($file) {
    echo "<p>File opened successfully</p>";
    
    // Read some content
    $content = fread($file, 10);
    echo "<p>Read first 10 bytes: " . htmlspecialchars($content) . "</p>";
    
    // Close the file
    if (fclose($file)) {
        echo "<p style='color: green'>File closed successfully!</p>";
    } else {
        echo "<p style='color: red'>Error closing file!</p>";
    }
    
    // Try to read after closing (will show error)
    echo "<p>Trying to read after closing:</p>";
    $result = @fread($file, 10);  // @ suppresses warning
    if ($result === false) {
        echo "<p style='color: red'>Cannot read from closed file!</p>";
    }
} else {
    echo "<p style='color: red'>Error opening file!</p>";
}
?>

</body>
</html>