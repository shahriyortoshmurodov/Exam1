const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" directory

// Route to handle message sending
app.post('/send-message', (req, res) => {
    const { name, email, message } = req.body;
    
    // Here you would typically save the message to a database or send an email
    console.log('Message received:', { name, email, message });

    // For this example, we'll just send a response back
    res.json({ message: 'Message sent successfully!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
