import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmail, registerWithEmail } from "../firebase";
import { useAuthUser } from "../store";
import styles from "./login.module.css";

function Login() {

    const authUser= useAuthUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (authUser) {
            navigate("/");
        }
    }, [authUser]);

    const handleSignIn = e => {
        e.preventDefault();
        signInWithEmail(email, password)
            .then(auth => auth && navigate("/"))
            .catch(error => alert(error.message));
    };

    const register = e => {
        e.preventDefault();
        registerWithEmail(email, password)
            .then(auth => auth && navigate("/"))
            .catch(error => alert(error.message));
    };

    return (
        <div className={styles.root}>
            <div className={styles.container}>
                <Link className={styles.logo} to="/">
                    <svg viewBox="0 0 602.280 181.499">
                        <use xlinkHref="/sprites.svg#amazon-logo" />
                    </svg>
                </Link>
                <form className={styles.form}>
                    <h1>Sign-in</h1>

                    <label>E-mail</label>
                    <input
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        onClick={handleSignIn}
                        className={styles.button}>
                        Continue
                    </button>

                    <button
                        type="submit"
                        onClick={register}
                        className={styles["register-button"]}>
                        Create your Amazon Account
                    </button>

                    <p>
                        By continuing, you agree to Amazon Clone's
                        Conditions of Use and Privacy Notice.
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;