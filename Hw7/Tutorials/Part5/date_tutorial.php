<?php
$today = date("Y-m-d");
$now = date("h:i A");
$dayOfWeek = date("l");
?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>Date and Time in PHP</h1>

<?php
// Display current date information
echo "<p>Today's Date: $today</p>";
echo "<p>Current Time: $now</p>";
echo "<p>Day of Week: $dayOfWeek</p>";

// Show different date formats
echo "<p>Full Date: " . date("F j, Y") . "</p>";
echo "<p>Short Date: " . date("m/d/y") . "</p>";

// Add days to current date
$futureDate = date("F j, Y", strtotime("+7 days"));
echo "<p>Date in 7 days: $futureDate</p>";
?>

</body>
</html>