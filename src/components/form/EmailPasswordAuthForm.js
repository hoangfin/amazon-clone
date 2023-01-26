import { memo, useCallback, useRef } from "react";
import { Button } from "components/button";
import style from "./email-password-auth-form.module.css";

const Component = ({ onSignIn, onRegister, isProcessing, className }) => {
    const emailRef = useRef();
    const pwdRef = useRef();

    const handleSubmit = useCallback(
        evt => {
            evt.preventDefault();
            console.log("handleSubmit");

            const data = {
                email: emailRef.current.value,
                password: pwdRef.current.value
            };

            const submitter = evt.nativeEvent.submitter;

            if (submitter?.name === "login") {
                onSignIn(data);
                return;
            }

            if (submitter?.name === "register") {
                onRegister(data);
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

            <Button name="login" className={style.button} disabled={isProcessing}>
                Continue
            </Button>

            <Button
                name="register"
                className={style.register}
                disabled={isProcessing}
            >
                Create your Amazon Account
            </Button>

            <p>
                By continuing, you agree to Amazon Clone's
                Conditions of Use and Privacy Notice.
            </p>
        </form>
    )
};

export const EmailPasswordAuthForm = memo(Component);