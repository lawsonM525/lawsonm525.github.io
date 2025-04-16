<?php
// process login form data and save user info to a file
// based on lab 1 and lab 2 requirements

// path for storing user data
$output_dir = "../output/";
$users_file = $output_dir . "users.txt";

// make output dir if it's not there
if (!is_dir($output_dir)) {
    mkdir($output_dir, 0755, true);
}

// Process form data when form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get user input
    $username = $_POST["uname"] ?? "";
    $password = $_POST["psw"] ?? "";
    $remember = isset($_POST["remember"]) ? "Yes" : "No";
    
    // Basic validation
    if (empty($username) || empty($password)) {
        echo "<h2>Error</h2>";
        echo "<p>Username and password are required.</p>";
        echo "<p><a href='../index.html'>Return to login page</a></p>";
        exit;
    }
    
    // Save user data to file
    $user_data = $username . "," . $password . "," . date("Y-m-d H:i:s") . "\n";
    $file = fopen($users_file, "a"); // Open in append mode
    
    if ($file) {
        fwrite($file, $user_data);
        fclose($file);
        
        // Show success message with user details
        echo "<!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Login Successful</title>
            <link rel='stylesheet' href='../css/style.css'>
        </head>
        <body>
            <div style='width: 80%; margin: 20px auto; text-align: center;'>
                <h2>Login Successful!</h2>
                <div class='container'>
                    <p>Username: " . htmlspecialchars($username) . "</p>
                    <p>Password: [hidden for security]</p>
                    <p>Remember me: " . $remember . "</p>
                    <p>Your account has been registered/verified.</p>
                    <button onclick=\"window.location.href='../index.html'\" style='max-width: 200px; margin: 20px auto;'>Return to Login</button>
                </div>
            </div>
        </body>
        </html>";
    } else {
        echo "<h2>Error</h2>";
        echo "<p>Could not save user data. Please try again later.</p>";
        echo "<p><a href='../index.html'>Return to login page</a></p>";
    }
} else {
    // Redirect if accessed directly without form submission
    header("Location: ../index.html");
    exit;
}
?>
