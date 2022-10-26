import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmail, registerWithEmail } from "./firebase";
import { useCurrentUser } from "./store";
import styles from "./login.module.css";

function Login() {

    const currentUser= useCurrentUser();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            navigate("/");
        }
    }, [currentUser]);

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
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                    />
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