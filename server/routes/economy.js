const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const economyFilePath = path.join(__dirname, '../data/economy.json');

// Helper function to read and write the JSON file
const readEconomyFile = () => JSON.parse(fs.readFileSync(economyFilePath, 'utf-8'));
const writeEconomyFile = (data) => fs.writeFileSync(economyFilePath, JSON.stringify(data, null, 2));

// Get the list of hospitalized children
router.get('/wallets', (req, res) => {
    const data = readEconomyFile();
    res.json(data.hospitalized);
});

// Get the list of discharged children
router.get('/discharged', (req, res) => {
    const data = readEconomyFile();
    res.json(data.discharged);
});

module.exports = router;
