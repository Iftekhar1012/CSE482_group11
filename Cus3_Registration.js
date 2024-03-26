const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Route for user registration
app.post('/userreg', (req, res) => {
    const { mailid, pword, firstname, lastname, phoneno } = req.body;

    const db = new sqlite3.Database('train_booking.sql', (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
    });

    const sql = `INSERT INTO customer (Fname, Lname, Email, Passwrd, Phone) VALUES (?, ?, ?, ?, ?)`;
    const values = [firstname, lastname, mailid, pword, phoneno];

    db.run(sql, values, function(err) {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
        
        console.log(`A new row has been inserted with rowid ${this.lastID}`);
        return res.send(`User registered successfully with email: ${mailid}`);
    });

    db.close();
});

app.get('/', (req, res) => {
    return res.render('Cus2_LoginPage.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});