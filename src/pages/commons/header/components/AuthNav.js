import { memo, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "hooks";
import { signOut } from "services/authentication";
import { ConfirmationDialog } from "components/modal";
import { userStore } from "stores";
import style from "./auth-nav.module.css";

export const AuthNav = memo(
    () => {
        const [user] = useStore(userStore);
        const [isOpen, setIsOpen] = useState(false);
        const navigate = useNavigate();
        const show = useCallback(() => setIsOpen(true), []);
        const hide = useCallback(() => setIsOpen(false), []);

        const logOut = useCallback(async () => {
            await signOut();
            setIsOpen(false);
            userStore.set(null);
            navigate("/");
        }, []);

        return (
            <>
                <div className={style.root}>
                    <svg viewBox="0 0 24 24" className={style.icon}>
                        <use href={`${process.env.PUBLIC_URL}/sprites.svg#account`} />
                    </svg>
                    <p style={{ lineHeight: "1.1" }}>
                        <span className={style["sub-text"]}>Hello</span>
                        {
                            user
                                ? <button onClick={show} className={style["primary-text"]}>
                                    {user.email.split("@")[0].split(".")[0]}
                                </button>
                                : <Link to="/login" className={style["primary-text"]}>Sign in</Link>
                        }
                    </p>
                </div>

                <ConfirmationDialog
                    isOpen={isOpen}
                    title="Confirmation"
                    message="Are you sure to sign out?"
                    onCancel={hide}
                    onConfirm={logOut}
                />
            </>
        )
    },
    () => true
);

AuthNav.displayName = "AuthNav";