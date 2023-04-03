import { memo, useCallback, useRef } from "react";
import { Select } from "components/select";
import { Button } from "components/button";
import countriesList from "data/countries.json";
import style from "./shipping-form.module.css";

const countries = countriesList.map(country => country.name);

export const ShippingForm = memo(
    ({ user, onSubmit, isProcessing, className }) => {
        const formRef = useRef(null);
        const name = useRef(null);
        const address = useRef(null);
        const postcode = useRef(null);
        const city = useRef(null);
        const state = useRef(null);
        const country = useRef(null);

        const submit = useCallback(() => formRef.current.requestSubmit(), []);

        const handleSubmit = useCallback(evt => {
            evt.preventDefault();
            onSubmit({
                name: name.current.value,
                address: address.current.value,
                postcode: postcode.current.value,
                city: city.current.value,
                ...(state.current?.value ? { state: state.current?.value } : {}),
                country: country.current.value
            });
        }, [onSubmit]);

        return (
            <form
                ref={formRef}
                className={`${style.root}${className ? " " + className : ""}`}
                onSubmit={handleSubmit}
            >
                <label className={style.label}>Country/Region</label>
                <Select
                    ref={country}
                    options={countries}
                    defaultValue={user?.shippingInfo?.country || countries[0]}
                />

                <label className={style.label}>Full name (First and Last name)</label>
                <input
                    ref={name}
                    type="text"
                    required
                    defaultValue={user?.shippingInfo?.name}
                    className={style.input}
                />

                <label className={style.label}>Street address</label>
                <input
                    ref={address}
                    type="text"
                    required
                    defaultValue={user?.shippingInfo?.address}
                    className={style.input}
                />

                <label className={style.label}>City</label>
                <input
                    ref={city}
                    type="text"
                    required
                    defaultValue={user?.shippingInfo?.city}
                    className={style.input}
                />

                <label className={style.label}>State / Province / Region</label>
                <input ref={state} type="text" className={style.input} />

                <label className={style.label}>Postcode</label>
                <input
                    ref={postcode}
                    type="text"
                    required
                    defaultValue={user?.shippingInfo?.postcode}
                    className={style.input}
                />

                <Button
                    type="button"
                    onClick={submit}
                    disabled={isProcessing}
                    disabledType="progress"
                    className={style.save}
                >
                    Save
                </Button>
            </form>
        );
    }
);

ShippingForm.displayName = "ShippingForm";
