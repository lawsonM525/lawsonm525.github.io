<?php
function calculateGrade($score) {
    if ($score >= 90) return 'A';
    if ($score >= 80) return 'B';
    if ($score >= 70) return 'C';
    if ($score >= 60) return 'D';
    return 'F';
}

$scores = array(95, 88, 72, 64, 55);
?>
<!DOCTYPE html>
<html>
<head>
    
</head>
<body>
<button onclick="window.location.href='../tutorials.html'">Back to Tutorials</button>
<h1>Student Grade Calculator</h1>
<p>Converting numerical scores to letter grades using a calculateGrade function:</p>

<?php
foreach ($scores as $score) {
    $grade = calculateGrade($score);
    echo "<p>Score: $score - Grade: $grade</p>";
}
?>

</body>
</html>