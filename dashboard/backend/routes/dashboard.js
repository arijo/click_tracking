const path = require('path');
const express = require('express');
const router = express.Router();
const Click = require('../models/click.js');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/public/index.html'));
});

module.exports = router;