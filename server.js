const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const multer = require('multer');
const cors = require('cors'); // Import the 'cors' middleware

const app = express();
const port = 3000; // You can change this to your preferred port number

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// const corsOptions = {
//     origin: 'https://armstate.onrender.com',
//     methods: 'POST',
// };

// app.use(cors(corsOptions));
app.use(cors({
    origin: 'http://localhost:3000', // Replace with the port your React app is using
    methods: 'GET,POST,PUT,DELETE',
    credentials: true, // If you are using cookies or authentication
}));

// Create a multer storage instance
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/get-quote', upload.none(), (req, res) => {
    const { daily_vol_alch, num_customer, zip_code, Liquidity, Revenue, Expenses } = req.body;

    // Check if any of the required parameters are missing
    if (!daily_vol_alch || !num_customer || !zip_code || !Liquidity || !Revenue || !Expenses) {
        return res.status(400).send('Missing one or more required parameters');
    }

    // Validate that the parameters are valid (you can add more specific validation as needed)
    if (isNaN(daily_vol_alch) || isNaN(num_customer) || isNaN(zip_code) || isNaN(Liquidity) || isNaN(Revenue) || isNaN(Expenses)) {
        return res.status(400).send('One or more parameters are not valid numbers');
    }

    // Construct the command to run the Python script
    const command = `python3 python-script.py ${daily_vol_alch} ${num_customer} ${zip_code} ${Liquidity} ${Revenue} ${Expenses}`;

    // Execute the Python script
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing the Python script: ${error}`);
            res.status(500).send('An error occurred while running the Python script');
        } else {
            console.log(`Python script output: ${stdout}`);
            res.status(200).send(stdout);
        }
    });
});



app.listen(port, () => {
    console.log(`Express server is running on port ${port}`);
});
