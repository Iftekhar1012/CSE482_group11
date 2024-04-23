<?php
include 'db.php'; // Ensure this file correctly connects to your database

$query = "SELECT username, message FROM messages"; // Adjust 'message_id' if your column has a different name
$result = $conn->query($query);

if ($result->num_rows > 0) {
    // Output data of each row
    while ($row = $result->fetch_assoc()) {
        echo "<div class='message'><strong>" . $row["username"] . ":</strong> " . $row["message"] . "</div>";
    }
} else {
    echo "No messages found";
}

$conn->close();
