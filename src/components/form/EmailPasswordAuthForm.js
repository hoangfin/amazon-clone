import { memo, useCallback, useRef, useState } from "react";
import { LoadingButton } from "components/button";
import style from "./email-password-auth-form.module.css";

export const EmailPasswordAuthForm = memo(
    ({ onSignIn, onRegister, isProcessing, className }) => {
        const emailRef = useRef();
        const pwdRef = useRef();
        const [submitter, setSubmitter] = useState("");

        const handleSubmit = useCallback(
            async (evt) => {
                evt.preventDefault();

                console.log(emailRef.current.value, pwdRef.current.value);

                const submitElement = evt.nativeEvent.submitter;
                setSubmitter(submitElement.name);

                if (submitElement.name === "login") {
                    onSignIn(emailRef.current.value, pwdRef.current.value);
                    console.log("login");
                    return;
                }

                if (submitElement.name === "register") {
                    onRegister(emailRef.current.value, pwdRef.current.value);
                    console.log("reister");
                    return;
                }
            },
            [onSignIn, onRegister]
        );

        return (
            <form onSubmit={handleSubmit} className={`${style.root}${className ? " " + className : ""}`}>
                <h1>Sign-in</h1>

                <label>E-mail</label>
                <input ref={emailRef} type="email" required className={style.input} defaultValue="test.abc@gmail.com" />

                <label>Password</label>
                <input ref={pwdRef} type="password" required className={style.input} defaultValue="testaccount" />

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
        );
    }
);

EmailPasswordAuthForm.displayName = "EmailPasswordAuthForm";