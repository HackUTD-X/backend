const express = require('express');
const router = express.Router();

router.get('/bot:question', (req, res) => {
    const userMessage = req.params.question;


    exec(`python ML/bot/your_python_script.py ${userMessage}`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error}`);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json({ response: stdout, error: stderr });
    });

})

module.exports = router;
