require('dotenv').config();

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

app.use(cors());
app.use(express.json());

app.get('/', (request, response) => response.status(200).send('hello world'));

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment Request Received:', total);
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, // subunits of the currency,
        currency: 'usd',
    });

    // OK - Created
    response.status(201).send({ clientSecret: paymentIntent.client_secret });
});

// Listen on Firebase Server(
exports.api = functions.https.onRequest(app);
