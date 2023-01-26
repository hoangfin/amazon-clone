import { memo, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmailPasswordAuthForm } from "components/form";
import { Modal } from "components/modal";
import {
    register as registerService,
    signIn as signInService
} from "services/authentication";
import { getUserByID as getUserByIDService } from "services/user";
import { useService } from "hooks";
import { userStore } from "stores";
import style from "./auth-form.module.css";
import { useMemo } from "react";

const Component = () => {
    const [authUser, signIn, isSigningIn] = useService(signInService);
    const [regUser, register, isRegistering] = useService(registerService);
    const [user, getUserByID, isFetchingUser] = useService(getUserByIDService);
    useMemo(() => {
        const id = authUser?.id || regUser?.id;
        if (id) {
            getUserByID(id);
        }
    }, [authUser, regUser]);
    const isProcessing = isSigningIn || isRegistering || isFetchingUser;
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignIn = useCallback(
        ({ email, password }) => {
            signIn(email, password).catch(err => setError(err.message));
        },
        [signIn]
    );

    const handleRegister = useCallback(
        ({ email, password }) => {
            register(email, password).catch(err => setError(err.message));
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
                isProcessing={isProcessing}
                onRegister={handleRegister}
                onSignIn={handleSignIn}
                className={style.form}
            />

            <Modal title="Error" isOpen={error} onClose={handleClose}>
                {error}
            </Modal>
        </>
    )
};

export const AuthForm = memo(Component);