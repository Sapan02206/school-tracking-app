const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Configure SMTP transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'codewithsapan007@gmail.com', // Your Gmail
    pass: 'mjepfsqgbkspcukz',            // Your App Password
  },
  logger: true,
  debug: true,
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error('Error configuring mail transporter:', error);
  } else {
    console.log('Mail transporter is ready');
  }
});

// Email sending function
async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: '"School Admin" <codewithsapan007@gmail.com>',
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
}

// API Routes
app.post('/send-attendance-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  const result = await sendEmail(to, subject, text);
  res.json(result);
});

app.post('/send-exam-schedule-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  const result = await sendEmail(to, subject, text);
  res.json(result);
});

app.post('/send-result-upload-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  const result = await sendEmail(to, subject, text);
  res.json(result);
});

app.post('/send-new-student-email', async (req, res) => {
  const { to, subject, text } = req.body;
  if (!to || !subject || !text) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }
  const result = await sendEmail(to, subject, text);
  res.json(result);
});

// Test email route
app.get('/test-email', async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: '"School Admin" <codewithsapan007@gmail.com>',
      to: 'your-email@gmail.com', // Replace with your testing email
      subject: 'Test Email from School Tracking Server',
      text: 'This is a test email to verify your server config.',
    });
    res.send('Test email sent: ' + info.messageId);
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).send('Failed to send test email.');
  }
});

// Static files and default route moved to the bottom
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index (6).html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
