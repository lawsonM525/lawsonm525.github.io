<?php 
$price = "19.99";  // String
$quantity = "5";   // String
?>
<!DOCTYPE html>
<html>
<head>
  
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>Shopping Calculations</h1>
<p>Converting strings to numbers for calculations:</p>

<?php
// Casting strings to float and integer
$priceNum = (float)$price;
$quantityNum = (int)$quantity;

// Calculate total
$total = $priceNum * $quantityNum;

echo "<p>Price: $" . $price . " (Type: " . gettype($price) . ")</p>";
echo "<p>Price after casting: $" . $priceNum . " (Type: " . gettype($priceNum) . ")</p>";
echo "<p>Quantity: " . $quantity . " (Type: " . gettype($quantity) . ")</p>";
echo "<p>Quantity after casting: " . $quantityNum . " (Type: " . gettype($quantityNum) . ")</p>";
echo "<p>Total cost: $" . $total . "</p>";
?>

</body>
</html>