// import necessary packages
const express = require('express');
const mongoose = require('mongoose');

// set up server and connect to MongoDB
const app = express();
mongoose.connect('mongodb://localhost/payment-form', { useNewUrlParser: true, useUnifiedTopology: true });

// define payment schema
const paymentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  amount: { type: Number, required: true },
  cardNumber: { type: String, required: true },
  expirationDate: { type: String, required: true },
  cvv: { type: String, required: true }
});

// create payment model from schema
const Payment = mongoose.model('Payment', paymentSchema);

// create POST route for payment form submission
app.post('/payment', async (req, res) => {
  try {
    // retrieve form data and validate it
    const { name, email, amount, cardNumber, expirationDate, cvv } = req.body;
    if (!name || !email || !amount || !cardNumber || !expirationDate || !cvv) {
      throw new Error('All fields are required');
    }

    // create payment document and save it to MongoDB
    const payment = new Payment({ name, email, amount, cardNumber, expirationDate, cvv });
    await payment.save();

    // send success response to client
    res.status(200).send('Payment successful');
  } catch (error) {
    // send error response to client
    res.status(400).send(error.message);
  }
});

// start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
//payment section 
$(document).ready(function() {
  $('form').submit(function(event) {
    event.preventDefault();
    var amount = $('#amount').val();
    var upiId = $('#upi-id').val();
    var name = $('#name').val();

    $('#amount').text(amount);
    $('#upi-id').text(upiId);
    $('#name').text(name);
  });
});
const express = require('express');
const Stripe = require('stripe')('your_stripe_secret_key');
const bodyParser = require('body-parser');

const App = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/charge', async (req, res) => {
  try {
    const { name, email, cardNumber, expDate, cvc } = req.body;

    // Create a Stripe token with the payment information
    const token = await stripe.tokens.create({
      card: {
        number: cardNumber,
        exp_month: expDate.split('/')[0],
        exp_year: expDate.split('/')[1],
        cvc: cvc
      }
    });

    // Create a Stripe charge with the token
    const charge = await stripe.charges.create({
      amount: 1000,
      currency: 'usd',
      source: token.id,
      description: 'Example charge',
      receipt_email: email
    });

    // If the charge was successful, render a success page
    res.render('success.html');
  } catch (err) {
    // If there was an error processing the payment, render an error page
    res.render('error.html');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
const stripe = require('stripe')(YOUR_STRIPE_SECRET_KEY);

app.post('/pay', async (req, res) => {
  const { amount, currency, description } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});
// payment tag

var form = document.getElementById('payment-form');
var cardElement = document.getElementById('card-element');
var main  = main ('YOUR_MAIN_API_KEY');
var elements = stripe.elements();
var card = elements.create('card', {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
    }
  }
});
card.mount(cardElement);
form.addEventListener('submit', function(event) {
  event.preventDefault();
  stripe.createToken(card).then(function(result) {
    if (result.error) {
      // Handle errors
    } else {
      // Send token to your server
    }
  });
});



const dropdownToggle = document.querySelector('.dropdown-toggle');

dropdownToggle.addEventListener('click', () => {
  const dropdownMenu = dropdownToggle.parentElement.querySelector('.dropdown-menu');
  dropdownToggle.parentElement.classList.toggle('open');
});
