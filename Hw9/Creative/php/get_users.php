<?php
// handles ajax requests to get users from users.txt
header('Content-Type: application/json');

// where's the user data?
$users_file = "../output/users.txt";

// empty response to start with
$response = array(
    'count' => 0,
    'users' => array()
);

// check if file exists
if (file_exists($users_file)) {
    // open the file
    $file = fopen($users_file, "r");
    
    if ($file) {
        $count = 0;
        $users = array();
        
        // read each line of the file
        while (($line = fgets($file)) !== false) {
            $count++;
            
            // parse the line (format: username,password,date)
            $data = explode(",", trim($line));
            
            if (count($data) >= 3) {
                $username = $data[0];
                // skip the password for security
                $date = $data[2];
                
                // add user to the array
                $users[] = array(
                    'username' => $username,
                    'date' => $date
                );
            }
        }
        
        // close the file
        fclose($file);
        
        // update the response
        $response['count'] = $count;
        $response['users'] = $users;
    }
}

// return the json response
echo json_encode($response);
?>
