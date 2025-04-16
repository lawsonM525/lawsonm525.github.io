<?php
$filename = "new_course.txt";
$content = "New Course Added:\n5. Artificial Intelligence\n6. Machine Learning";
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>Writing to Files with fwrite()</h1>

<?php
// Open file for writing
$file = fopen($filename, "w");

// Write content to file
if ($file) {
    fwrite($file, $content);
    echo "<p style='color: green'>Successfully wrote to $filename!</p>";
    
    // Show what we wrote
    echo "<h2>Content written to file:</h2>";
    echo "<pre>" . htmlspecialchars($content) . "</pre>";
    
    fclose($file);
    
    // Now read and display the file
    echo "<h2>Reading back the file contents:</h2>";
    echo "<pre>" . htmlspecialchars(file_get_contents($filename)) . "</pre>";
} else {
    echo "<p style='color: red'>Error opening file for writing!</p>";
}
?>

</body>
</html>