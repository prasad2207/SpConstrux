const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Enable CORS to allow the frontend to communicate with the backend
app.use(cors());

// Middleware to parse JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



// Set up the email transporter (use your SMTP server settings)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Using Gmail service
    auth: {
      user: 'ulip.sipl@gmail.com', // Replace with your Gmail address
      pass: 'swgo uptx cenv anni'   // Replace with your Gmail app password or regular password
    },
    tls: {
      rejectUnauthorized: false
    },
    // Using port 587 (non-SSL, uses TLS)
    port: 587,
    secure: false // false for TLS, true for SSL
  });

// Route to handle the POST request for sending an email
app.post('/send-email', (req, res) => {
    const { name, mobile, message } = req.body;

    // Email options
    const mailOptions = {
        from: email,
        to: 'prasadpshinde2000@gmail.com',  // Replace with the recipient's email
        subject: `New message from ${name}`,
        text: `You have received a new message from ${name} (${mobile}):\n\n${message}`
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
            return res.status(500).send('Error sending email.');
        }
        console.log('Email sent:', info.response);
        res.status(200).send('Email sent successfully!');
    });
});

// Serve static files (e.g., index.html, script.js) from the 'public' folder
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
