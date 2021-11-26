import { Link } from "react-router-dom";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { FcGoogle } from "react-icons/fc";
// import Footer from "../../components/Footer/Footer";
import styles from "./LoginPage.module.scss";

export default function LoginPage() {
  return (
    <section className={styles.loginPage}>
      <div className={styles.loginPageContent}>
        <Link to="/">
          <img src={logo} alt="Dev-Sky logo" />
        </Link>

        <form className={styles.loginForm}>
          <div className={styles.loginFormInput}>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="correo@example.com" />
          </div>

          <div className={styles.loginFormInput}>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Contraseña" id="password" />
          </div>

          <Link to="/reset-password">¿Olvidaste tu contraseña? </Link>

          <button type="submit">Iniciar sesión</button>
        </form>

        <button>
          <FcGoogle />
          Iniciar sesión con Google
        </button>

        <Link to="/register">¿No tienes una cuenta? Registrate</Link>
      </div>
    </section>
  );
}
