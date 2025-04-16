<?php
// This file handles resetting all users in the users.txt file
header('Content-Type: application/json');

// Define the path to the users.txt file
$users_file = "../output/users.txt";

// Check if the file exists
if (file_exists($users_file)) {
    // Open the file with write mode to clear its contents
    $file = fopen($users_file, "w");
    
    if ($file) {
        // Close the empty file
        fclose($file);
        
        // Return success response
        echo json_encode(array(
            'success' => true,
            'message' => 'All users have been deleted successfully.'
        ));
    } else {
        // Return error response
        echo json_encode(array(
            'success' => false,
            'message' => 'Failed to open the users file.'
        ));
    }
} else {
    // Create an empty file if it doesn't exist
    $file = fopen($users_file, "w");
    if ($file) {
        fclose($file);
        
        // Return success response
        echo json_encode(array(
            'success' => true,
            'message' => 'User file created successfully.'
        ));
    } else {
        // Return error response
        echo json_encode(array(
            'success' => false,
            'message' => 'Failed to create the users file.'
        ));
    }
}
?>
