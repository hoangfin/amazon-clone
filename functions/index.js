const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
    "sk_test_51LBxovAczuSx9Naatkz0hldA8xBpbmhKdBpAZQHIRJQP" +
    "rWrnKGUmCKWJ3uLSr47RFR7MgLW3bxh7CsrKd2yYN69100K5Nr2fqV");

// - App config
const app = express();

// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("Hello World!"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  console.log("Payment request received BOOM!!! for this amount >>>> ", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// - Listen to command
exports.api = functions.https.onRequest(app);
