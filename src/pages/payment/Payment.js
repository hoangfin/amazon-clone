import { Modal } from "components/modal";
import { Spinner } from "components/progress";
import { useCallback, useState } from "react";
import { Header } from "../commons";
import styles from "./payment.module.css";
import { PaymentMethod } from "./PaymentMethod";
import { ReviewItems } from "./ReviewItems";
import { ShippingAddress } from "./ShippingAddress";

export const Payment = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClose = useCallback(() => setError(null), []);

    return (
        <>
            <Header />
            <div className={styles.root}>
                <section className={styles.section}>
                    <h3 className={styles.heading}>Shipping Address</h3>
                    <div className={styles.content}>
                        <ShippingAddress onError={setError} onLoad={setIsLoading} />
                    </div>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.heading}>Review items</h3>
                    <div className={styles.content}>
                        <ReviewItems />
                    </div>
                </section>
                <section className={styles.section}>
                    <h3 className={styles.heading}>Payment method</h3>
                    <div className={styles.content}>
                        <PaymentMethod onError={setError} />
                    </div>
                </section>
            </div>

            <Modal isOpen={isLoading}>
                <Spinner />
            </Modal>

            <Modal isOpen={error} onClose={handleClose}>
                {error}
            </Modal>

        </>
    );
};