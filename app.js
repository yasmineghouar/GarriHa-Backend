// const express = require('express');
// const pool = require("./database.js");
// // import admin from "firebase-admin"
// import { initializeApp, applicationDefault } from 'firebase-admin/app';
// import { getMessaging } from 'firebase-admin/messaging';
// // import express, {json} from "express"

// const cors = require("cors");
// const bodyParser = require("body-parser");
// const multer = require('multer');



// // For notifications 
// // var admin = require("firebase-admin");

// // var serviceAccount = require("path/to/serviceAccountKey.json");
// process.env.GOOGLE_APPLICATION_CREDENTIALS
// initializeApp({
//   credential: applicationDefault(),
//   projectId : 'projettdmbackend',
// });



// // Configure Multer for file uploads
// const storage = multer.memoryStorage(); // Use in-memory storage for temporary handling of uploaded files
// const upload = multer({ storage: storage });

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());
// app.use(bodyParser.raw({ type: 'image/*'}));

// const userController = require("./Controllers/userController"); 
// const ParkingController = require("./Controllers/ParkingController"); 
// const ReservationController = require("./Controllers/ReservationController"); 


// app.get('/test', function (req, res) {
//     res.send('Hello, World!');
// });

// app.use("/user", userController);
// app.use("/Parking", ParkingController);
// app.use("/Reservation", ReservationController);

// AppCheck.post("/send",function(req,res){
//     const receivedToken = req.body.fcmToken;
//     const message = {
//         notification: {
//             title: "Notif",
//             body: 'This is a test notif'
//         },
//         // token=
//     };
// });

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log(`Listening on port ${port}...`));

const express = require('express');
const { initializeApp, applicationDefault } = require('firebase-admin/app');
const { getMessaging } = require('firebase-admin/messaging');
const cors = require("cors");
const bodyParser = require("body-parser");

const pool = require("./database.js");

const multer = require('multer');
const path = require('path');
// Initialize Firebase Admin SDK
initializeApp({
  credential: applicationDefault(),
  projectId : 'projettdmbackend',
});

// Configure Multer for file uploads
// const storage = multer.memoryStorage();
const storage = multer.diskStorage({ 
    destination: './upload/images',
    filename: (req, file ,cb)=> {
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({ 
    storage: storage 
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw({ type: 'image/*'}));

// app.use("/profile",express.static('upload/images'));
// app.use("/profile", express.static(path.join(__dirname, 'upload', 'images')));

const userController = require("./Controllers/userController"); 
const ParkingController = require("./Controllers/ParkingController"); 
const ReservationController = require("./Controllers/ReservationController"); 

app.get('/test', function (req, res) {
    res.send('Hello, World!');
});

app.use("/user", userController);
app.use("/Parking", ParkingController);
app.use("/Reservation", ReservationController);

// Route for sending notifications
app.post("/sendNotification", async (req, res) => {
    const { fcmToken, title, body } = req.body;

    try {
        const messaging = getMessaging(); // Obtain the messaging instance
        await messaging.send({
            token: fcmToken,
            notification: {
                title: title,
                body: body
            }
        });

        res.status(200).send('Notification sent successfully');
    } catch (error) {
        console.error('Error sending notification:', error);
        res.status(500).send('Internal server error');
    }
});

// test upload photo
app.post("/upload",upload.single('profile'),(req,res)=>{
    console.log(req.file);
    res.json({
        success: 1,
        profile_url: `http://localhost:3000/profile/${req.file.filename}`
    })
})


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
