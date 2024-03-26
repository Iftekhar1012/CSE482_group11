const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route for admin login
app.post('/adminlogin', (req, res) => {
    const { uname, pword } = req.body;

    const db = new sqlite3.Database('train_booking.sql', (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
    });

    const sql = `SELECT * FROM admin`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }

        const admin = rows.find(row => row.username === uname && row.password === pword);
        if (admin) {
            return res.redirect('/admindashboard');
        } else {
            return res.status(401).render('Admin1_LoginPage.html', { error: 'Invalid credentials. Please try again.' });
        }
    });

    db.close();
});

// Route for admin dashboard
app.get('/admindashboard', (req, res) => {
    // Placeholder for admin dashboard content
    return res.render('Admin2_HomePage.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});