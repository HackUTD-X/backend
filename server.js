const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path'); // Import the 'path' module
const { log } = require('console');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const pythonApiEndpoint = 'http://your-python-ai-model-api-endpoint'; // Replace with your Python API endpoint

// Serve your front-end (HTML, CSS, and JavaScript) here
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('message', async (message) => {
        try {
            // Forward user message to Python AI model via REST API
            // const response = await axios.post(pythonApiEndpoint, { message });
            console.log(message);
            // Send the AI model's response to the user
            // socket.emit('message', response.data.response);
            socket.emit('message', message);

        } catch (error) {
            console.error('Error communicating with Python API:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
