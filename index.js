require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");
const CallLog = require("./models/CallLog");

const app = express();
app.use(cors());
app.use(bodyParser.json());
/**
 * === Issues Identified and Resolved in This File ===
 * 
 * 1. **MongoDB Connection Handling:**
 *    - Added `.catch()` to handle connection errors and prevent unhandled exceptions.
 * 
 *    **Before:**
 *    ```javascript
 *    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
 *    ```
 *    **After:**
 *    ```javascript
 *    mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 *        .then(() => console.log("MongoDB Connected"))
 *        .catch(err => console.error(err));
 *    ```
 *
 * 2. **Error Handling in Twilio Call Triggering:**
 *    - Added a check to ensure `phoneNumber` exists in the request.
 *    - Wrapped the `client.calls.create()` function in a try-catch block to properly handle errors.
 *
 *    **Before:**
 *    ```javascript
 *    app.post("/trigger-call", async (req, res) => {
 *        const call = await client.calls.create({
 *            url: "http://demo.twilio.com/docs/voice.xml",
 *            to: req.body.phoneNumber,
 *            from: process.env.TWILIO_PHONE_NUMBER
 *        });
 *        res.json({ message: "Call initiated", callSid: call.sid });
 *    });
 *    ```
 *    **After:**
 *    ```javascript
 *    app.post("/trigger-call", async (req, res) => {
 *        const { phoneNumber } = req.body;
 *
 *        if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });
 *
 *        try {
 *            const call = await client.calls.create({
 *                url: "http://demo.twilio.com/docs/voice.xml",
 *                to: phoneNumber,
 *                from: process.env.TWILIO_PHONE_NUMBER
 *            });
 *
 *            await CallLog.create({ phoneNumber, status: "Call Sent" });
 *
 *            res.json({ message: "Call initiated", callSid: call.sid });
 *        } catch (err) {
 *            res.status(500).json({ error: err.message });
 *        }
 *    });
 *    ```
 *
 * 3. **Proper Logging of Calls in MongoDB:**
 *    - Added `await CallLog.create(...)` after initiating a call to ensure each call is logged.
 *
 *    **Before:** No logging of call attempts.
 *    **After:**
 *    ```javascript
 *    await CallLog.create({ phoneNumber, status: "Call Sent" });
 *    ```
 *
 * === End of Issue Documentation ===
 */



const PORT = process.env.PORT || 3000;
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

// Route to trigger a medication reminder call
app.post("/trigger-call", async (req, res) => {
    const { phoneNumber } = req.body;

    if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });

    try {
        const call = await client.calls.create({
            url: "http://demo.twilio.com/docs/voice.xml", // Twilio demo XML
            to: phoneNumber,
            from: process.env.TWILIO_PHONE_NUMBER
        });

        await CallLog.create({ phoneNumber, status: "Call Sent" });

        res.json({ message: "Call initiated", callSid: call.sid });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
