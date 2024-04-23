<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "chat_app";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} else {
    echo "Connected successfully"; // You can replace this with any action you want to perform after successful connection
}
