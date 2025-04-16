<?php
// This file handles AJAX requests to retrieve user data from the users.txt file
header('Content-Type: application/json');

// Define the path to the users.txt file
$users_file = "../output/users.txt";

// Initialize response array
$response = array(
    'count' => 0,
    'users' => array()
);

// Check if the file exists
if (file_exists($users_file)) {
    // Open the file
    $file = fopen($users_file, "r");
    
    if ($file) {
        $count = 0;
        $users = array();
        
        // Read each line of the file
        while (($line = fgets($file)) !== false) {
            $count++;
            
            // Parse the line (format: username,password,date)
            $data = explode(",", trim($line));
            
            if (count($data) >= 3) {
                $username = $data[0];
                // Skip the password for security
                $date = $data[2];
                
                // Add user to the array
                $users[] = array(
                    'username' => $username,
                    'date' => $date
                );
            }
        }
        
        // Close the file
        fclose($file);
        
        // Update the response
        $response['count'] = $count;
        $response['users'] = $users;
    }
}

// Return the JSON response
echo json_encode($response);
?>
