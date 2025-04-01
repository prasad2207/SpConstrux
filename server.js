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
  const { name, email, mobile, message } = req.body; // Destructure values from the request body

  // Make sure all fields are available
  if (!name || !mobile || !message) {
      return res.status(400).send({ success: false, message: 'Missing fields' });
  }

  const mailOptions = {
      from: email,  // From the email provided in the form
      to: 'prasadpshinde2000@gmail.com',  // Replace with the recipient's email
      subject: `New message from ${name}`,
      text: `You have received a new message from ${name} (${mobile}):\n\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.error('Error:', error);  // Log the error for debugging
          return res.status(500).send({
              success: false,
              message: 'Error sending email',
              error: error.message,
          });
      }

      console.log('Email sent:', info.response);
      return res.status(200).send({
          success: true,
          message: 'Email sent successfully',
      });
  });
});


// Serve static files (e.g., index.html, script.js) from the 'public' folder
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
