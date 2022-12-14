import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks";
import { signIn, register } from "../services";
import styles from "./auth-form.module.css";

export function AuthForm({ rootClassName }) {

    const currentUser = useAuthContext();
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser]);

    const handleSignIn = e => {
        e.preventDefault();
        signIn(emailRef.current, passwordRef.current)
            .then(authUser => authUser && navigate("/"))
            .catch(error => alert(error.message));
    };

    const handleRegister = e => {
        e.preventDefault();
        register(emailRef.current, passwordRef.current)
            .then(authUser => authUser && navigate("/"))
            .catch(error => alert(error.message));

    };

    return (
        <div
            className={`${
                styles.root}${rootClassName ? " " + rootClassName : ""}`
            }>
            <Link className={styles.logo} to="/">
                <svg viewBox="0 0 602.280 181.499">
                    <use xlinkHref="/sprites.svg#amazon-logo" />
                </svg>
            </Link>
            <div className={styles.form}>
                <h1>Sign-in</h1>

                <label>E-mail</label>
                <input
                    type="text"
                    className={styles.input}
                    onChange={e => emailRef.current = e.target.value}
                />

                <label>Password</label>
                <input
                    type="password"
                    className={styles.input}
                    onChange={e => passwordRef.current = e.target.value}
                />

                <button
                    type="button"
                    onClick={handleSignIn}
                    className={styles.button}>
                    Continue
                </button>

                <button
                    type="button"
                    onClick={handleRegister}
                    className={styles["register-button"]}>
                    Create your Amazon Account
                </button>

                <p>
                    By continuing, you agree to Amazon Clone's
                    Conditions of Use and Privacy Notice.
                </p>
            </div>
        </div>
    )
}