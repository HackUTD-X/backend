const { exec } = require('child_process');
const multer = require('multer');

// Create a multer storage instance
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const express = require('express');
const router = express.Router();

router.post('/get-quote', upload.none(), (req, res) => {
    const { daily_vol_alch, num_customer, zip_code, Liquidity, Revenue, Expenses, safety_rating } = req.body;

    console.log(req.body);

    // Check if any of the required parameters are missing
    if (!daily_vol_alch || !num_customer || !zip_code || !Liquidity || !Revenue || !Expenses || !safety_rating) {
        return res.status(400).send('Missing one or more required parameters');
    }



    // Validate that the parameters are valid (you can add more specific validation as needed)
    if (isNaN(daily_vol_alch) || isNaN(num_customer) || isNaN(zip_code) || isNaN(Liquidity) || isNaN(Revenue) || isNaN(Expenses) || !isNaN(safety_rating)) {
        return res.status(400).send('One or more parameters are not valid numbers');
    }

    const num_safety_inc = Math.floor(Math.random() * 100) + 1;

    const elec_cuts = Math.floor(Math.random() * 5) + 1;

    // Construct the command to run the Python script
    const command = `python3 ML/Data/risk_prediction.py ${daily_vol_alch} ${num_customer} ${num_safety_inc} ${elec_cuts} ${safety_rating}`;

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

module.exports = router;
