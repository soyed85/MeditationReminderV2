# Medication Reminder Service with Twilio Integration

This project implements a medication reminder service that triggers phone calls using Twilio. It connects to MongoDB to log call activities and ensures proper error handling for robust functionality.

## Technologies Used

- **Node.js**: Backend server environment
- **Express**: Web framework for Node.js
- **MongoDB**: Database for storing call logs
- **Twilio API**: Integration for initiating phone calls
- **dotenv**: Environment variable management
- **mongoose**: MongoDB object modeling for Node.js
- **body-parser**: Middleware to parse incoming request bodies
- **cors**: Middleware for handling Cross-Origin Resource Sharing
- **Postman**: API testing tool

## Features

- **Call Triggering**: Endpoint (`/trigger-call`) to initiate reminder calls with Twilio.
- **Error Handling**: Proper error checks and responses for invalid requests.
- **Logging**: Stores each call attempt in MongoDB for tracking and auditing purposes.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd medication-reminder-service
   
2. **Install Dependencies
   ```bash
   npm install
   
3. **Set Environment Variables Create a .env file in the root directory and add the following:
   ```bash
   TWILIO_ACCOUNT_SID=your_twilio_account_sid
   TWILIO_AUTH_TOKEN=your_twilio_auth_token
   TWILIO_PHONE_NUMBER=your_twilio_phone_number
   DEEPGRAM_API_KEY=your_deepgram api key
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/medication
   
4. **Start the Server
   ```bash
   node index.js
   
5. **Testing with Postman
   1. Open Postman and create a new **POST** request.  
   2. Enter the following URL: `http://localhost:3000/trigger-call`.  
   3. In the **Body** tab, select **raw** and **JSON** format, then enter the following payload:  

   ```bash
   {
     "phoneNumber": "Twilio verified phone number"
   }


6. **Testing with Postman

![image](https://github.com/user-attachments/assets/51c4fe50-4652-41c0-87e9-c0751a885056)



