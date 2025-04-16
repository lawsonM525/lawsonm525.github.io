<?php 

$houses = array("King House", "Tyler House", "Baldwin House", "Scales House", "Comstock House", "Cutter House");

?>
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>Smith Houses List</h1>
<p> Some houses at Smith College are as follows: </p>
<ol>  

<?php

for ($i = 0; $i < count($houses); $i++) {
    echo "<li>" . $houses[$i]  . "</li>";
}

?>

</ol>

</body>
</html>
