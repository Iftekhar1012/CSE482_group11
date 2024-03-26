const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Route for user login
app.post('/userlogin', (req, res) => {
    const { uname, pword } = req.body;

    const db = new sqlite3.Database('train_booking.sql', (err) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
    });

    const sql = `SELECT * FROM customer`;

    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }

        const customer = rows.find(row => row.username === uname && row.password === pword);
        if (customer) {
            return res.redirect('/customerdashboard');
        } else {
            return res.status(401).render('Cus2_LoginPage.html', { error: 'Invalid credentials. Please try again.' });
        }
    });

    db.close();
});

// Route for customer dashboard
app.get('/customerdashboard', (req, res) => {
    // Placeholder for customer dashboard content
    return res.render('Customer_Dashboard.html');
});

app.get('/', (req, res) => {
    return res.render('1Cus2.0_StartingStations.html');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});