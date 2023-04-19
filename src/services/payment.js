import { post } from "libs/api";

export const createPaymentIntent = async (items) => {
    const response = await post(
        process.env.NODE_ENV === "production"
            ?   "https://europe-west3-clone-8ce9f.cloudfunctions.net/stripe/createPaymentIntent"
            :   "http://127.0.0.1:5000/clone-8ce9f/us-central1/createPaymentIntent"
        ,
        items
    );
    return response.data.clientSecret;
};