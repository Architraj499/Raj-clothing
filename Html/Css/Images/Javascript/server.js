const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;
    const userData = { username, email, password };

    // Write user data to a local file (user_data.json)
    fs.writeFile('user_data.json', JSON.stringify(userData), (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('User data saved successfully.');
        res.redirect('/Main.html');
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Read user data from a local file (user_data.json)
    fs.readFile('user_data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send('Internal Server Error');
            return;
        }

        const userData = JSON.parse(data);

        if (userData.username === username && userData.password === password) {
            res.send(`<html><body><h1>Welcome back, ${username}!</h1></body></html>`);
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
