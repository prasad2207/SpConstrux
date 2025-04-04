const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 8080;

// Enable CORS
app.use(cors());

// Middleware for parsing JSON and form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Set up the email transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ulip.sipl@gmail.com',
        pass: 'swgo uptx cenv anni'
    },
    tls: { rejectUnauthorized: false },
    port: 587,
    secure: false
});

// 📩 Route to send email
app.post('/send-email', (req, res) => {
    const { name, email, mobile, message } = req.body;

    if (!name || !mobile || !message) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    const mailOptions = {
        from: 'ulip.sipl@gmail.com',
        to: 'prasadpshinde2000@gmail.com',
        subject: `New message from ${name}`,
        text: `You have received a new message from ${name} (${mobile}):\n\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error:', error);
            return res.status(500).json({ success: false, message: 'Error sending email', error: error.message });
        }

        console.log('Email sent:', info.response);
        return res.status(200).json({ success: true, message: 'Email sent successfully' });
    });
});

// 📂 Serve static files (Frontend)
app.use(express.static('public'));

// 📁 File path for responses
const JSON_FILE = path.join(__dirname, 'responses.json');

// 📌 Function to read responses from JSON file
const getResponses = () => {
    try {
        if (!fs.existsSync(JSON_FILE)) return [];
        const data = fs.readFileSync(JSON_FILE, 'utf8');
        return data ? JSON.parse(data) : [];
    } catch (err) {
        console.error('Error reading JSON file:', err);
        return [];
    }
};

// 📌 Function to save responses to JSON file
const saveResponses = (responses) => {
    try {
        fs.writeFileSync(JSON_FILE, JSON.stringify(responses, null, 2));
    } catch (err) {
        console.error('Error writing JSON file:', err);
    }
};

// 📝 Route to save response to JSON file
app.post('/save-response', (req, res) => {
    const { name, mobile, message } = req.body;
    if (!name || !mobile || !message) {
        return res.status(400).json({ success: false, message: 'Missing fields' });
    }

    let responses = getResponses();
    responses.push({ name, mobile, message, contacted: false }); // Default contacted: false
    saveResponses(responses);

    res.status(200).json({ success: true, message: 'Response saved successfully' });
});

// 📌 Route to get saved responses
app.get('/get-responses', (req, res) => {
    res.status(200).json({ success: true, responses: getResponses() });
});

// ✅ Route to mark response as "Contacted"
app.post('/mark-contacted/:index', (req, res) => {
    let responses = getResponses();
    const index = parseInt(req.params.index);

    if (responses[index]) {
        responses[index].contacted = true;
        saveResponses(responses);
        res.json({ success: true, message: 'Marked as Contacted' });
    } else {
        res.status(404).json({ success: false, message: 'Entry not found' });
    }
});

// ❌ Route to delete response
app.delete('/delete-response/:index', (req, res) => {
    let responses = getResponses();
    const index = parseInt(req.params.index);

    if (responses[index]) {
        responses.splice(index, 1); // Remove the entry
        saveResponses(responses);
        res.json({ success: true, message: 'Entry deleted' });
    } else {
        res.status(404).json({ success: false, message: 'Entry not found' });
    }
});

// 🚀 Start the server
app.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
});
