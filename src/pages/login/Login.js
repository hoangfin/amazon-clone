import { memo, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useStore } from "hooks";
import { userStore } from "stores";
import { AuthForm } from "./components";
import style from "./login.module.css";

const Component = () => {
    const [user] = useStore(userStore);
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    if (user) return null;

    return (
        <>
            <Link className={style.logo} to="/">
                <svg viewBox="0 0 602.280 181.499">
                    <use xlinkHref={`${process.env.PUBLIC_URL}/sprites.svg#amazon-logo`} />
                </svg>
            </Link>

            <AuthForm />
        </>

    );
};

export const Login = memo(Component);