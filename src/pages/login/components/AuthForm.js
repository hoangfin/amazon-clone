import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "hooks";
import { userStore } from "stores";
import { EmailPasswordAuthForm } from "components/form";
import { ErrorDialog, Modal } from "components/modal";
import {
    register as registerService,
    signIn as signInService
} from "services/authentication";
import style from "./auth-form.module.css";

const Component = () => {
    const [authUser, signIn, isSigningIn] = useService(signInService);
    const [regUser, register, isRegistering] = useService(registerService);
    const user = authUser || regUser;
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = useCallback(
        ({ email, password }) => {
            signIn(email, password).catch(err => setError(err));
        },
        [signIn]
    );

    const handleRegister = useCallback(
        ({ email, password }) => {
            register(email, password).catch(err => setError(err));
        },
        [register]
    );

    const handleClose = useCallback(() => setError(null), []);

    useEffect(() => {
        if (user) {
            userStore.set(user);
            navigate("/");
        }
    }, [user]);

    return (
        <>
            <EmailPasswordAuthForm
                isProcessing={isSigningIn || isRegistering}
                onRegister={handleRegister}
                onSignIn={handleSignIn}
                className={style.form}
            />

            <ErrorDialog
                title="Oops! Error has occurred"
                message={error?.message}
                isOpen={error}
                onClose={handleClose}
            />
        </>
    )
};

export const AuthForm = memo(Component);