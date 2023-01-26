import { memo, useCallback, useRef } from "react";
import { Select } from "components/select";
import styles from "./shipping-form.module.css";
import countries from "data/countries.json";
import { Button } from "components/button";

const selectOpts = countries.map(country => country.name);

const Component = ({ onSubmit, className }) => {
    const country = useRef(null);
    const fullname = useRef(null);
    const address = useRef(null);
    const apartment = useRef(null);
    const city = useRef(null);
    const zip = useRef(null);

    const handleSubmit = useCallback(evt => {
        evt.preventDefault();
        onSubmit({
            country: country.current.value,
            fullname: fullname.current.value,
            address: address.current.value,
            apartment: apartment.current.value,
            city: city.current.value,
            zip: zip.current.value
        });
    }, [onSubmit]);

    return (
        <div
            className={`${styles.root}${className ? " " + className : ""}`}
        >
            <label>Country/Region</label>
            <Select
                ref={country}
                options={selectOpts}
                defaultValue={selectOpts[0]}
            />
            <label>Full name (First and Last name)</label>
            <input ref={fullname} type="text" name="fullname" />

            <label>Street address</label>
            <input
                ref={address}
                type="text"
                name="address"
                placeholder="Street Address, P.O box, company name, c/o"
            />
            <input
                ref={apartment}
                type="text"
                name="apartment"
                placeholder="Apartment, suite, unit, building, floor, etc."
            />

            <label>City</label>
            <input ref={city} type="text" name="city" />

            <label>State / Province / Region</label>
            <input type="text" name="state" />

            <label>Zip Code</label>
            <input ref={zip} type="text" name="zip" />

            <Button type="button" onClick={handleSubmit}>
                Save
            </Button>
        </div>
    );
};

export const ShippingForm = memo(Component);
