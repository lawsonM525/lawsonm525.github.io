<?php
// This file handles AJAX requests to retrieve user data from the users.json file
header('Content-Type: application/json');

// Define the path to the users.json file
$users_file = "../users.json";

// Initialize response array
$response = array(
    'count' => 0,
    'users' => array()
);

// Check if the file exists
if (file_exists($users_file)) {
    // Read and parse JSON data
    $json_data = file_get_contents($users_file);
    
    if (!empty($json_data)) {
        $users = json_decode($json_data, true);
        
        // Check for JSON decode errors
        if ($users !== null && json_last_error() === JSON_ERROR_NONE) {
            $count = count($users);
            $user_data = array();
            
            // Format user data for response
            foreach ($users as $user) {
                $user_data[] = array(
                    'username' => $user['username'],
                    'date' => $user['registered_at'],
                    'last_login' => $user['last_login'],
                    'status' => $user['status']
                );
            }
            
            // Update the response
            $response['count'] = $count;
            $response['users'] = $user_data;
        }
    }
}

// Return the JSON response
echo json_encode($response);
?>
