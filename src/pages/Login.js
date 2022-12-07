import { AuthForm } from "features/auth";
import styles from "./login.module.css";

const Login = () => <AuthForm rootClassName={styles.form} />;

export default Login;