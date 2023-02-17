import { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
import { createOrder } from "services/order";
import { cartStore } from "stores";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "services/payment";
import { LoadingButton } from "components/button";
import style from "./stripe-card-payment.module.css";

const cardStyle = {
    style: {
        base: {
            color: "#32325d",
            fontSmoothing: "antialiased",
            fontSize: "17px",
            "::placeholder": {
                color: "#32325d"
            }
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    }
};

const Component = ({ items, orderedBy, onSucceed, className }) => {
    const stripe = useStripe();
    const elements = useElements();
    const formRef = useRef();
    const [paymentIntent, setPaymentIntent] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");

    useMemo(() => {
        if (items?.length) {
            createPaymentIntent(items)
                .then(setClientSecret)
                .catch(err => setError(err.message));
        }
    }, [items]);

    const submit = useCallback(() => formRef.current.requestSubmit(), []);

    const validate = async (event) => {
        // listen for changes in the CardElement,
        // validate and display any errors as customer
        // type their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const processPayment = async (event) => {
        event.preventDefault();
        setIsProcessing(true);

        try {
            const { paymentIntent, error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) }
            });

            // catch Stripe errors
            if (stripeError) {
                setError(`Payment failed! ${stripeError.message}`);
                setIsProcessing(false);
                return;
            }

            const order = {
                id: paymentIntent.id,
                orderedBy,
                items,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            };

            await createOrder(order.id, order);
            cartStore.set([]);

            setError("");
            setIsProcessing(false);
            setPaymentIntent({
                paymentID: paymentIntent.id,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            });
        } catch (err) {
            setError(err.message);
            setIsProcessing(false);
        }
    };

    useEffect(() => {
        if (paymentIntent && typeof onSucceed === "function") {
            onSucceed(paymentIntent);
        }
    }, [paymentIntent, onSucceed]);

    return (
        <form ref={formRef} onSubmit={processPayment} className={className}>
            <CardElement onChange={validate} options={cardStyle} className={style.card} />

            {
                /* Show any error that happens when isProcessing the paymentIntent */
                error ? <p className={style.error} role="alert">{error}</p> : null
            }

            <p><i>*Simulate payments with following test cards</i></p>
            <ul className={style.cards}>
                <li>BRAND</li>
                <li>NUMBER</li>
                <li>CVC</li>
                <li>DATE</li>
                <li>Visa</li>
                <li>4242 4242 4242 4242</li>
                <li>Any 3 digits</li>
                <li>Any future date</li>
                <li>Mastercard</li>
                <li>5555 5555 5555 4444</li>
                <li>Any 3 digits</li>
                <li>Any future date</li>
            </ul>

            <LoadingButton
                type="button"
                onClick={submit}
                isLoading={isProcessing}
                // Pay button is disabled during processing paymentIntent,
                // invalid credit card or paymentIntent has completed successfully
                disabled={isProcessing || disabled || paymentIntent}
                className={style["order-button"]}
            >
                Place your order
            </LoadingButton>
        </form>
    );
};

export const StripeCardPayment = memo(Component);