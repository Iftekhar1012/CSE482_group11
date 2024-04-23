<?php
include 'db.php'; // Include your database connection

// Let's assume you have a session started and have stored the username in a session variable
session_start();

if (isset($_POST['message']) && isset($_POST['username'])) {
    // The mysqli real_escape_string function escapes special characters in a string for use in an SQL query
    $message = $conn->real_escape_string($_POST['message']);
    $username = $conn->real_escape_string($_POST['username']);


    // Insert message into database
    $sql = "INSERT INTO messages (username, message) VALUES ('$username', '$message')";

    if ($conn->query($sql) === TRUE) {
        echo "Message sent!";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    // Close connection
    $conn->close();
} else {
    echo "No message received";
}
