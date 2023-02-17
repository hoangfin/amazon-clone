import { memo, useCallback, useRef, useState } from "react";
import { LoadingButton } from "components/button";
import style from "./email-password-auth-form.module.css";

const Component = ({ onSignIn, onRegister, isProcessing, className }) => {
    const emailRef = useRef();
    const pwdRef = useRef();
    const [submitter, setSubmitter] = useState("");

    const handleSubmit = useCallback(
        async (evt) => {
            evt.preventDefault();

            const submitElement = evt.nativeEvent.submitter;
            setSubmitter(submitElement.name);

            if (submitElement.name === "login") {
                onSignIn(emailRef.current.value, pwdRef.current.value);
                return;
            }

            if (submitElement.name === "register") {
                onRegister(emailRef.current.value, pwdRef.current.value);
                return;
            }
        },
        [onSignIn, onRegister]
    );

    return (
        <form
            className={`${style.root}${className ? " " + className : ""}`}
            onSubmit={handleSubmit}
        >
            <h1>Sign-in</h1>

            <label>E-mail</label>
            <input ref={emailRef} type="email" required className={style.input} />

            <label>Password</label>
            <input ref={pwdRef} type="password" required className={style.input} />

            <LoadingButton
                name="login"
                isLoading={isProcessing && submitter === "login"}
                disabled={isProcessing}
                className={style.button}
            >
                Continue
            </LoadingButton>

            <LoadingButton
                name="register"
                isLoading={isProcessing && submitter === "register"}
                disabled={isProcessing}
                className={style.register}
            >
                Create your Amazon Account
            </LoadingButton>

            <p>By continuing, you agree to Amazon Clone's Conditions of Use and Privacy Notice.</p>
        </form>
    )
};

export const EmailPasswordAuthForm = memo(Component);