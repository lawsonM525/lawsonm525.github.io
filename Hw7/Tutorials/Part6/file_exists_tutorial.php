<?php
$files = array(
    "notes.txt",
    "nonexistent.txt",
    "new_course.txt",
    "missing_file.txt"
);
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>Checking Files with file_exists()</h1>

<?php
echo "<h2>Checking multiple files:</h2>";
foreach ($files as $file) {
    echo "<p>Checking '$file': ";
    if (file_exists($file)) {
        echo "<span style='color: green'>File exists!</span>";
        
        // Show additional file info
        echo "<br>Size: " . filesize($file) . " bytes";
        echo "<br>Last modified: " . date("F d Y H:i:s", filemtime($file));
    } else {
        echo "<span style='color: red'>File does not exist!</span>";
    }
    echo "</p>";
}

// Demonstrate is_file vs is_dir
echo "<h2>Checking file vs directory:</h2>";
echo "<p>'notes.txt' is a file: " . (is_file("notes.txt") ? "Yes" : "No") . "</p>";
echo "<p>'.' is a directory: " . (is_dir(".") ? "Yes" : "No") . "</p>";
?>

</body>
</html>