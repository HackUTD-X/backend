const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the 'cors' middleware

const app = express();
const port = 3000; // You can change this to your preferred port number

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: 'http://localhost:3000', // Replace with the port your React app is using
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // If you are using cookies or authentication
}));

const getQuoteRoute = require('./routes/get-quote');
const helloWorldRoute = require('./routes/hello-world');

app.use('/', getQuoteRoute);
app.use('/', helloWorldRoute);

app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});
