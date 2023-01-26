import { useState, useEffect, useRef, memo } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "services/payment";
import { Spinner } from "components/progress";
import styles from "./stripe-card-payment.module.css";

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

const Component = ({ items, onSucceed, className }) => {
    const [succeeded, setSucceeded] = useState(null);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState();
    const stripe = useStripe();
    const elements = useElements();
    const formRef = useRef();

    console.log(items);

    {/*
        React 18.2.0 does not submit form with <button type="submit"/> for some
        reason, therefore I need to submit programmatically using dispatchEvent
    */}
    const submit = () => {
        formRef.current.dispatchEvent(
            new Event("submit", { cancelable: true, bubbles: true })
        );
    };

    const handleChange = async (event) => {
        console.log("handleChange triggered");
        // Listen for changes in the CardElement
        // and display any errors as the customer types their card details
        setDisabled(event.empty);
        setError(event.error ? event.error.message : "");
    };

    const handleSubmit = async (event) => {
        console.log("handleSubmit triggered");
        event.preventDefault();
        setProcessing(true);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (result.error) {
            setError(`Payment failed! ${result.error.message}`);
            setProcessing(false);
        } else {
            setError(null);
            setProcessing(false);
            setSucceeded({
                paymentID: result.paymentIntent.id,
                amount: result.paymentIntent.amount,
                created: result.paymentIntent.created
            });
        }
    };

    useEffect(() => {
        if (items.length !== 0) {
            createPaymentIntent(items)
                .then(setClientSecret)
                .catch(error => console.log(error));
        }

    }, [items, createPaymentIntent]);

    useEffect(() => {
        if (succeeded && onSucceed) {
            onSucceed(succeeded);
        }
    }, [succeeded, onSucceed]);

    return (
        <form
            ref={formRef}
            className={`${styles.root}${className ? " " + className : ""}`}
            onSubmit={handleSubmit}
        >
            <CardElement
                className={styles.card}
                options={cardStyle}
                onChange={handleChange}
            />

            {
                /* Show any error that happens when processing the payment */
                error &&
                <div className={styles.error} role="alert">
                    {error}
                </div>
            }

            <button
                type="button"
                onClick={submit}
                className={styles.smtbutton}
                disabled={processing || disabled || succeeded}
            >
                <span>{processing ? <Spinner /> : "Place your order"}</span>
            </button>

            {/* Show a success message upon completion */}
            {/* <p className={succeeded ? "result-message" : "result-message hidden"}>
                Payment succeeded, see the result in your
                <a
                    href={`https://dashboard.stripe.com/test/payments`}
                >
                    {" "}
                    Stripe dashboard.
                </a> Refresh the page to pay again.
            </p> */}
        </form>
    );
};

export const StripeCardPayment = memo(Component);
