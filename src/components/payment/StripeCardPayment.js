import { useState, useEffect, useRef, memo, useMemo, useCallback } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent as createPI } from "services/payment";
import { LoadingButton } from "components/button";
import { useService } from "hooks";
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

const Component = ({ items, onSucceed, className }) => {
    const stripe = useStripe();
    const elements = useElements();
    const formRef = useRef();
    const [payment, SetPayment] = useState(null);
    const [error, setError] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, createPaymentIntent] = useService(createPI);

    useMemo(() => {
        if (items?.length) {
            createPaymentIntent(items).catch(err => setError(err.message));
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsProcessing(true);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });

        if (result.error) {
            setError(`Payment failed! ${result.error.message}`);
            setIsProcessing(false);
        } else {
            setError("");
            setIsProcessing(false);
            SetPayment({
                paymentID: result.paymentIntent.id,
                amount: result.paymentIntent.amount,
                created: result.paymentIntent.created
            });
        }
    };

    useEffect(() => {
        if (payment && typeof onSucceed === "function") {
            onSucceed(payment);
        }
    }, [payment, onSucceed]);

    return (
        <form ref={formRef} onSubmit={handleSubmit} className={className}>
            <CardElement onChange={validate} options={cardStyle} className={style.card} />

            {
                /* Show any error that happens when isProcessing the payment */
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
                // Pay button is disabled during processing payment,
                // invalid credit card or payment has completed successfully
                disabled={isProcessing || disabled || payment}
                className={style["order-button"]}
            >
                Place your order
            </LoadingButton>
        </form>
    );
};

export const StripeCardPayment = memo(Component);