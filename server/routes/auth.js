const express = require('express');
const fs = require('fs');
const path = require('path');
const { validateToken, renewToken } = require('../utils/authUtils');

const router = express.Router();
const usersFilePath = path.join(__dirname, '../data/accounts.json');

// Helper function to read and write the JSON file
function readUsersFile(){
    return JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));
}
function writeUsersFile(data) {
    fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
}

// Login endpoint
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Missing username or password' });
    }

    const users = readUsersFile();
    const user = users.find((u) => u.username === username && u.password === password);

    if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Check if the token is valid or needs renewal
    if (!validateToken(user.token)) {
        user.token = renewToken(user.id, 8);
        writeUsersFile(users);
    }
    res.json({
        name: user.name,
        lastname: user.lastname,
        token: user.token,
        gender: user.gender,
    });
});

module.exports = router;