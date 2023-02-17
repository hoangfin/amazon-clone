import { memo, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useService } from "hooks";
import { userStore } from "stores";
import { EmailPasswordAuthForm } from "components/form";
import { Dialog } from "components/modal";
import {
    register as registerService,
    signIn as signInService
} from "services/authentication";
import style from "./auth-form.module.css";

const Component = () => {
    const [authUser, signIn, isSigningIn, authError, setAuthError] = useService(signInService);
    const [regUser, register, isRegistering, regError, setRegError] = useService(registerService);
    const user = authUser || regUser;
    const error = authError || regError;
    const navigate = useNavigate();

    const handleClose = useCallback(() => {
        setAuthError(null);
        setRegError(null);
    }, []);

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
                onRegister={register}
                onSignIn={signIn}
                className={style.form}
            />

            <Dialog
                type="error"
                title="Oops! Error has occurred"
                message={error?.message}
                isOpen={error}
                onClose={handleClose}
            />
        </>
    )
};

export const AuthForm = memo(Component);