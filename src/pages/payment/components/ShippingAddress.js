import { memo, useMemo, useCallback, useState } from "react";
import { useService, useStore } from "hooks";
import { userStore } from "stores";
import { ShippingForm } from "components";
import { Button } from "components/button";
import { Dialog } from "components/modal";
import { updateUser as updateUserService } from "services/user";
import style from "./shipping-address.module.css";

const Component = () => {
    const [user] = useStore(userStore);
    const [, updateUser, isUpdating] = useService(updateUserService);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [error, setError] = useState(null);

    const address = useMemo(() => {
        if (!user?.shippingInfo) return <p>No shipping address found</p>;

        const { name, address, postcode, city, state, country } = user.shippingInfo;
        return (
            <>
                <p>{name}</p>
                <p>{address}</p>
                <p>{postcode} {city}</p>
                <p>{state}</p>
                <p className={style.country}>{country}</p>
            </>
        );
    }, [user?.shippingInfo]);

    const hideError = useCallback(() => setError(null), []);
    const showForm = useCallback(() => setIsFormOpen(true), []);
    const hideForm = useCallback(() => setIsFormOpen(false), []);

    const handleSubmit = useCallback(
        async (formData) => {
            if (!user?.id) return;
            try {
                await updateUser(user.id, { shippingInfo: formData });
                userStore.update(user.id, { shippingInfo: formData });
                hideForm();
            } catch (error) {
                setError(error)
            }
        },
        [user?.id, updateUser]
    );

    return (
        <>
            <div className={style.root}>
                <h2 className={style.heading}>Shipping Address</h2>
                <div>
                    {address}
                    
                    <Button onClick={showForm}>Edit</Button>
                </div>
            </div>

            <Dialog
                title="Update your shipping address"
                isOpen={isFormOpen}
                onClose={hideForm}
            >
                <ShippingForm
                    user={user}
                    onSubmit={handleSubmit}
                    isProcessing={isUpdating}
                />
            </Dialog>

            <Dialog title="Error" isOpen={error} onClose={hideError}>
                {error?.message}
            </Dialog>
        </>
    )
};

export const ShippingAddress = memo(Component);
