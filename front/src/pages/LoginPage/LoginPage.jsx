import React, {useCallback, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "./LoginPage.module.scss";
import regex from "../../helpers/regex";
import 'firebase/auth';
import { useAuthState } from "react-firebase-hooks/auth";
import {auth, signInWithEmailAndPassword, signInWithGoogle} from "../../firebaseConfig";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";


export default function LoginPage() {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [inputError, setInputError] = useState({
    email: false,
    password: false,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) history.replace("/");
  }, [user, loading]);

  const onKeyUpValidation = ({ id, value }) => {
    switch (id) {
      case "email":
        if (regex.email.test(value.trim())) {
          setInputError({ ...inputError, [id]: false });
        } else setInputError({ ...inputError, [id]: true });
        break;
      case "password":
        if (regex.password.test(value.trim())) {
          setInputError({ ...inputError, [id]: false });
        } else setInputError({ ...inputError, [id]: true });
        break;
      default:
        break;
    }
  };

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () =>{
    let isValid = false;
    const { email, password } = input;

    if (email === "" || password === "") {
      setInputError({
        email: email === "",
        password: password === "",
      });
    } else isValid = true;
    return isValid;
  };

  const resetForm = () => {
    setInput({
      email: "",
      password: "",
    });
    setInputError({
      email: false,
      password: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push("/");
    if (validateForm()) {
      resetForm();
    }
  };

  return (
      <section className={styles.loginPage}>
      {/* <GoHomeButton />*/}

        <div className={styles.loginPageContent}>
          <Link to="/">
            <img src={logo} alt="Dev-Sky logo" />
          </Link>

          <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e)}>
            {/* --------- Email ---------- */}
            <div className={styles.loginFormInput}>
              <FaEnvelope
                  className={
                    inputError.email
                        ? styles.loginFormInputIcon +
                        " " +
                        styles.loginFormInputIconError
                        : styles.loginFormInputIcon
                  }
              />
              <label htmlFor="email">Email</label>
              <input
                  autoComplete="on"
                  className={inputError.email ? styles.loginFormInputError : ""}
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={(e) => {
                    const id = e.currentTarget.id;
                    const value = e.currentTarget.value;
                    onKeyUpValidation({ id, value });
                  }}
                  placeholder="correo@example.com"
              />
              {inputError.email && (
                  <span className={styles.loginFormInputErrorMessage}>
                Ingrese un email válido ej: correo@example.com
              </span>
              )}
            </div>

            {/* --------- Password ------------ */}
            <div className={styles.loginFormInput}>
              <RiLockPasswordFill
                  className={
                    inputError.password
                        ? styles.loginFormInputIcon +
                        " " +
                        styles.loginFormInputIconError
                        : styles.loginFormInputIcon
                  }
              />
              <label htmlFor="password">Password</label>
              <input
                  className={inputError.password ? styles.loginFormInputError : ""}
                  type="password"
                  placeholder="contraseña"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyUp={(e) => {
                    const id = e.currentTarget.id;
                    const value = e.currentTarget.value;
                    onKeyUpValidation({ id, value });
                  }}
              />
              {inputError.password && (
                  <span className={styles.loginFormInputErrorMessage}>
                Ingrese una contraseña entre 4 y 12 caracteres
              </span>
              )}
            </div>

            <Link to="/reset">¿Olvidaste tu contraseña?</Link>

            <button
                className="login__btn"
                onClick={() => signInWithEmailAndPassword(email, password)}
            >
              Login
            </button>
          </form>
          <Link className={styles.userLink} to="/user"/>

          <button className={styles.googleBtn} onClick={signInWithGoogle}>
            <FcGoogle />
            Iniciar Sesión con Google</button>

          <Link to="/register">¿No tienes cuenta? Registrate</Link>
        </div>
      </section>
  );
}