<?php
$days = array("Monday", "Tuesday", "Wednesday", "Thursday", "Friday");
$temperatures = array(72, 75, 68, 70, 73);
?>
<!DOCTYPE html>
<html>
<head>
  
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>Weather Stuff</h1>

<h2>Using for loop to parse through two arrays:</h2>
<?php
for ($i = 0; $i < count($days); $i++) {
    echo "<p>$days[$i]: $temperatures[$i]°F</p>";
}
?>

<h2>Using foreach loop to parse the same arrays:</h2>
<?php
foreach ($days as $index => $day) {
    echo "<p>$day: $temperatures[$index]°F</p>";
}
?>

<h2>Using while loop to parse the same arrays:</h2>
<?php
$i = 0;
while ($i < count($days)) {
    echo "<p>$days[$i]: $temperatures[$i]°F</p>";
    $i++;
}
?>

</body>
</html>