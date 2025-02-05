// import express from "express";
// import { dbConnection } from "./database/dbConnection.js";
// import { config } from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import fileUpload from "express-fileupload";
// import { errorMiddleware } from "./middlewares/error.js";
// import messageRouter from "./router/messageRouter.js";
// import userRouter from "./router/userRouter.js";
// import appointmentRouter from "./router/appointmentRouter.js";

// const app = express();
// config({ path: "./config/config.env" });

// app.use(
//   cors({
//     origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
//     method: ["GET", "POST", "DELETE", "PUT"],
//     credentials: true,
//   })
// );

// app.use(cookieParser());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); //express.urlencoded means  built-in middleware in express

// app.use(
//   fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/tmp/",
//   })
// );
// app.use("/api/v1/message", messageRouter);
// app.use("/api/v1/user", userRouter);
// app.use("/api/v1/appointment", appointmentRouter);

// dbConnection();

// app.use(errorMiddleware);



// //Twilio Configuration 

// // Import Twilio and express
// const twilio = require("twilio");

// // Your Twilio credentials
// const accountSid = "ACca8c298e1e062b684e75765e0b55a21d";
// const authToken = "f58a67f420d1715bb6f3bad770b7a143";
// const client = new twilio(accountSid, authToken);

// const router = express.Router();

// router.post("/send-reminder", async (req, res) => {
//   const { phone, appointmentDate } = req.body;
  
//   try {
//     // Customize the message
//     const message = `Reminder: You have an appointment scheduled on ${appointmentDate}. Please arrive 10 minutes early.`;

//     // Send SMS
//     const sms = await client.messages.create({
//       body: message,
//       from: "",
//       to: phone,
//     });

//     res.status(200).json({ message: "Reminder sent successfully", sms });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to send reminder", error });
//   }
// });

// module.exports = router;



// export default app;



//-------------------Twilio Experiment code----------

import express from "express";
import { dbConnection } from "./database/dbConnection.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import { errorMiddleware } from "./middlewares/error.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import appointmentRouter from "./router/appointmentRouter.js";
import twilio from "twilio";

const app = express();
config({ path: "./config/config.env" });

// Twilio Configuration
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = new twilio(accountSid, authToken);

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
    methods: ["GET", "POST", "DELETE", "PUT","PATCH"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// Registering Routers
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Twilio Reminder Route
app.post("/api/v1/send-reminder", async (req, res) => {
  let { phone, appointmentDate } = req.body;

  // Basic validation for 10-digit Indian numbers
  if (!phone || !phone.match(/^\d{10}$/)) {
    return res.status(400).json({ message: "Invalid phone number format. Use a 10-digit number like 6379851657." });
  }

  // Add the +91 country code for Indian numbers
  phone = `+91${phone}`;

  try {
    const message = `Reminder: You have an appointment scheduled on ${appointmentDate}. Please arrive 30 minutes early.`;
    const sms = await twilioClient.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER, // Twilio verified phone number
      to: phone,
    });

    res.status(200).json({ message: "Reminder sent successfully", sms });
  } catch (error) {
    console.error("Error sending SMS:", error);
    res.status(500).json({ message: "Failed to send reminder", error: error.message });
  }
});


// Database connection
dbConnection();

// Error handling middleware
app.use(errorMiddleware);

export default app;


