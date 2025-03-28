const mongoose = require("mongoose");

const CallLogSchema = new mongoose.Schema({
    phoneNumber: String,
    status: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("CallLog", CallLogSchema);
