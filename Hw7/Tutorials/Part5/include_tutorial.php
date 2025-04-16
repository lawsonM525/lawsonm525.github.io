<!DOCTYPE html>
<html>
<head>
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>

<?php
// Include the header file
include 'header.php';

// Use the function from the included file
displayHeader("Include Tutorial");

// Show that we're back in the main file
echo "<p>This content is from include_tutorial.php</p>";

// Demonstrate require vs include
echo "<p>Using require_once to include the same file again (won't cause an error):</p>";
require_once 'header.php';

echo "<p>The header.php file was already included, so require_once didn't include it again.</p>";
?>

</body>
</html>