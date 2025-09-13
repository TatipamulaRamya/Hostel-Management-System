// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});


const Report = mongoose.model('Report', reportSchema);
module.exports = Report;
