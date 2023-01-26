import { memo, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "services/authentication";
import { ConfirmationDialog } from "components/modal";
import { userStore, useStore } from "stores";
import style from "./auth-nav.module.css";

const Component = () => {
    const [user, setUser] = useStore(userStore);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const show = useCallback(() => setIsOpen(true), []);
    const hide = useCallback(() => setIsOpen(false), []);

    const logOut = useCallback(async () => {
        await signOut();
        setIsOpen(false);
        setUser(null);
        navigate("/");
    }, []);

    return (
        <>
            {
                user
                    ?   <button className={style.welcome} onClick={show}>
                            Hello, {user.email}
                        </button>
                    :   <Link to="/login" className={style.welcome}>
                            Hello, Sign in
                        </Link>
            }

            <ConfirmationDialog
                isOpen={isOpen}
                title="Confirmation"
                message="Are you sure to sign out?"
                onCancel={hide}
                onConfirm={logOut}
            />

        </>
    )
};

export const AuthNav = memo(Component, () => true);