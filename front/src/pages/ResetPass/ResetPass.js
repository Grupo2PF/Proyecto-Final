import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { auth, sendPasswordResetEmail } from "../../firebaseConfig";
import styles from "./ResetPass.module.scss";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { FaEnvelope } from "react-icons/fa";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();
  useEffect(() => {
    if (loading) return;
    if (user) history.replace("/dashboard");
  }, [user, loading]);

  return (
    <section className={styles.resetPage}>
      <GoHomeButton />
      <div className={styles.resetContent}>
        <Link to="/">
          <img src={logo} alt="DevSky Logo" className={styles.resetLogo} />
        </Link>

        <div className={styles.resetInput}>
          <FaEnvelope className={styles.resetInputIcon} />
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@example.com"
            required
          />
        </div>

        <button
          className={styles.resetButton}
          onClick={() => sendPasswordResetEmail(email)}
        >
          Enviar correo de restablecimiento de contraseña
        </button>

        <Link className={styles.resetRegister} to="/register">
          ¿No tienes cuenta? Registrate
        </Link>
      </div>
    </section>
  );
}
export default Reset;
