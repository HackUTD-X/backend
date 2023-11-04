const mongoose = require('mongoose');
require('dotenv').config()

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGOCONNECT);
}

// Define the schema for your form data
const formSchema = new mongoose.Schema({
    id: String,
    monthlyCarPayment: Number,
    studentLoanPayment: Number,
    estimatedMortgagePayment: Number,
    creditScore: Number,
    grossMonthlyIncome: Number,
    monthlyCreditCardPayment: Number,
    homeAppraisedValue: Number,
    downPaymentAmount: Number,
});


const response = mongoose.model(process.env.FORM_NAME, responseSchema);

module.exports = {
    model: response
}