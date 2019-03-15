const mongoose = require('mongoose');

const Click = mongoose.model('Click', {pageX: Number, pageY: Number, ts: Date});

module.exports = Click;