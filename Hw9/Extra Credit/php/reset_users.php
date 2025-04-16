<?php
// clears all users from the json file
header('Content-Type: application/json');

// where's the data?
$users_file = "../users.json";

// empty array for fresh start
$empty_users = [];

// make it json
$json_data = json_encode($empty_users, JSON_PRETTY_PRINT);

// Write empty array to file
if (file_put_contents($users_file, $json_data)) {
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'All users have been deleted successfully.'
    ]);
} else {
    // Return error response
    echo json_encode([
        'success' => false,
        'message' => 'Failed to reset the users file.'
    ]);
}
?>
