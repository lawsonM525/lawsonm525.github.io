<?php
// save login info to json file
// based on Creative version but with JSON instead

// where to store stuff
$output_dir = "../output/";
$users_file = "../users.json";

// make output dir if needed
if (!is_dir($output_dir)) {
    mkdir($output_dir, 0755, true);
}

// handle form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // get user input
    $username = $_POST["uname"] ?? "";
    $password = $_POST["psw"] ?? "";
    $remember = isset($_POST["remember"]) ? true : false;
    
    // basic validation
    if (empty($username) || empty($password)) {
        echo "<h2>Error</h2>";
        echo "<p>Username and password are required.</p>";
        echo "<p><a href='../index.html'>Return to login page</a></p>";
        exit;
    }
    
    // prep user data
    $new_user = [
        "username" => $username,
        "password" => $password, // in a real app, this would be hashed
        "remember" => $remember,
        "registered_at" => date("Y-m-d H:i:s"),
        "last_login" => date("Y-m-d H:i:s"),
        "status" => "active"
    ];
    
    // read existing users or create new array
    $users = [];
    if (file_exists($users_file)) {
        $json_data = file_get_contents($users_file);
        if (!empty($json_data)) {
            $users = json_decode($json_data, true);
            
            // if json decode failed
            if ($users === null && json_last_error() !== JSON_ERROR_NONE) {
                $users = [];
            }
        }
    }
    
    // check if user already exists and update instead of adding
    $user_exists = false;
    foreach ($users as $key => $user) {
        if ($user['username'] === $username) {
            // update existing user
            $users[$key]['last_login'] = date("Y-m-d H:i:s");
            $users[$key]['remember'] = $remember;
            $user_exists = true;
            break;
        }
    }
    
    // add new user if not found
    if (!$user_exists) {
        $users[] = $new_user;
    }
    
    // save to json file
    $json_data = json_encode($users, JSON_PRETTY_PRINT);
    
    if (file_put_contents($users_file, $json_data)) {
        // show success message with user details
        echo "<!DOCTYPE html>
        <html lang='en'>
        <head>
            <meta charset='UTF-8'>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>
            <title>Login Successful</title>
            <link rel='stylesheet' href='../css/y2k.css'>
            <style>
                .success-container {
                    max-width: 500px;
                    margin: 2rem auto;
                    padding: 2rem;
                    border: 3px solid var(--hot-pink);
                    border-radius: 10px;
                    background: linear-gradient(135deg, var(--black) 25%, #1a1a1a 100%);
                    box-shadow: 0 0 15px var(--hot-pink);
                    text-align: center;
                }
                .success-message {
                    margin: 1.5rem 0;
                    font-size: 1.2rem;
                }
                .success-btn {
                    background: linear-gradient(to right, var(--hot-pink), var(--neon-pink));
                    color: var(--white);
                    border: none;
                    border-radius: 5px;
                    padding: 0.8rem 1.5rem;
                    font-family: 'VCR', 'Courier New', monospace;
                    font-weight: bold;
                    text-transform: uppercase;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 0 10px var(--hot-pink);
                    display: inline-block;
                    text-decoration: none;
                    margin-top: 1rem;
                }
                .success-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 0 15px var(--neon-pink);
                }
            </style>
        </head>
        <body>
            <div class='success-container'>
                <h1>Login Success</h1>
                <div class='glitter-line'></div>
                <div class='success-message'>
                    <p>Welcome back, <strong>" . htmlspecialchars($username) . "</strong>!</p>
                    <p>Your account has been " . ($user_exists ? 'updated' : 'registered') . ".</p>
                </div>
                <a href='../login.html' class='success-btn'>Return to Login</a>
            </div>
        </body>
        </html>";
    } else {
        echo "<h2>Error</h2>";
        echo "<p>Could not save user data. Please try again later.</p>";
        echo "<p><a href='../index.html'>Return to login page</a></p>";
    }
} else {
    // redirect if accessed directly without form submission
    header("Location: ../index.html");
    exit;
}
?>
