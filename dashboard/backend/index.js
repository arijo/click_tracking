const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const config = require('./config/config.json')[process.env.NODE_ENV || 'development'];
const api = require('./routes/api.js');
const dashboard = require('./routes/dashboard.js');

mongoose.connect(config.db.host, {useNewUrlParser: true});

app.use(cors());
app.use(express.static(path.join(__dirname, '../frontend/public')));
app.use(express.json());
app.use('/click', api);
app.use('/', dashboard);

app.listen(3000, () => {
    console.log('backend listening on port 3000 ...');
});