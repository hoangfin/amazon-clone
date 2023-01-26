const functions = require("firebase-functions");
const cors = require("cors")({
    origin: true
});

const stripe = require("stripe")(
    "sk_test_51LBxovAczuSx9Naatkz0hldA8xBpbmhKdBpAZQHIRJQP" +
    "rWrnKGUmCKWJ3uLSr47RFR7MgLW3bxh7CsrKd2yYN69100K5Nr2fqV"
);

// calculate the order total on the server side to prevent
// people from manipulating amount directly on the client-side
const calculateOrderAmount = items => {
    return items.reduce(
        (accumulator, item) => item.price * item.quantity + accumulator,
        0
    );
};

exports.createPaymentIntent = functions.https.onRequest(async (req, res) => {
    cors(req, res, async () => {
        const items = req.body;
        const subtotal = calculateOrderAmount(items);

        console.log(`Received payment request with subtotal = ${subtotal}`);

        // create PaymentIntent object
        const paymentIntent = await stripe.paymentIntents.create({
            amount: subtotal,
            currency: "usd"
        });

        res
            .status(201)
            .send({
                clientSecret: paymentIntent.client_secret
            });
    });
});
