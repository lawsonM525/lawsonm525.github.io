<?php
$firstName = "Ada";
$lastName = "Lovelace";
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>String Operations</h1>

<?php
// Concatenation
$fullName = $firstName . " " . $lastName;
echo "<p>Full name: $fullName</p>";

// String length
echo "<p>Length of full name: " . strlen($fullName) . " characters</p>";

// Uppercase and lowercase
echo "<p>Uppercase: " . strtoupper($fullName) . "</p>";
echo "<p>Lowercase: " . strtolower($fullName) . "</p>";

// Substring
echo "<p>First 3 letters: " . substr($firstName, 0, 3) . "</p>";

// String position
$position = strpos($fullName, "Love");
echo "<p>Position of 'Love': " . $position . "</p>";

// String replacement
$newName = str_replace("Ada", "Augusta Ada", $fullName);
echo "<p>Modified name: " . $newName . "</p>";
?>

</body>
</html>