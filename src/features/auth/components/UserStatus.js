import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks";
import styles from "./user-status.module.css";

export const UserStatus = React.memo(
    () => {
        const currentUser = useAuthContext();

        // console.log("UserStatus renders");

        return (
            <Link to={!currentUser && "/login"}>
                <span className={styles.welcome}>
                    Hello, {currentUser ? currentUser.email : "Sign in"}
                </span>
            </Link>
        )
    },
    () => true
);
