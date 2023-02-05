import { memo, useCallback, useEffect, useState } from "react";
import { Button } from "components/button";
import { ShippingForm } from "components";
import { Modal } from "components/modal";
import { useService, useStore } from "hooks";
import { updateUser as updateUserService } from "services/user";
import { userStore } from "stores";

const Component = ({ onError, onLoad }) => {
    const [user] = useStore(userStore);
    const [, updateUser, isLoading] = useService(updateUserService);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showShippingForm = useCallback(() => setIsModalOpen(true), []);
    const closeShippingForm = useCallback(() => setIsModalOpen(false), []);

    const handleSubmit = useCallback(formData => {
        // drop undefined/null properties from formData object
        const filteredData = Object.entries(formData).reduce(
            (acc, [k, v]) => {
                if (v) acc[k] = v;
                return acc;
            },
            {}
        );
        updateUser(user.id, { shippingAddress: filteredData })
            .then(() => {
                userStore.set();
                closeShippingForm();
            })
            .catch(onError);
    }, [user?.id, updateUser]);

    useEffect(() => {
        onLoad(isLoading);
    }, [isLoading, onLoad]);

    return (
        <>
            {
                user?.shippingAddress
                    ? <>
                        <p>{user.shippingAddress.fullname}</p>
                        <p>{user.shippingAddress.address}</p>
                        <p>{user.shippingAddress.apartment}</p>
                        <p>{user.shippingAddress.city}</p>
                        <p>{user.shippingAddress.zip}</p>
                    </>
                    : <p>No shipping address found</p>
            }

            <Button onClick={showShippingForm}>Edit</Button>
            <Modal isOpen={isModalOpen} onClose={closeShippingForm}>
                <ShippingForm onSubmit={handleSubmit} />
            </Modal>
        </>
    )
};

export const ShippingAddress = memo(Component);
