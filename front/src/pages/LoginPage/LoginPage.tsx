import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "./LoginPage.module.scss";
import regex from "../../helpers/regex";
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

  type OnKeyData = {
    id: string;
    value: string;
  };
  const onKeyUpValidation = ({ id, value }: OnKeyData): void => {
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = (): boolean => {
    let isValid = false;
    const { email, password } = input;

    if (email === "" || password === "") {
      setInputError({
        email: email === "" ? true : false,
        password: password === "" ? true : false,
      });
    } else isValid = true;
    return isValid;
  };

  const resetForm = (): void => {
    setInput({
      email: "",
      password: "",
    });
    setInputError({
      email: false,
      password: false,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (validateForm()) {
      resetForm();
      alert("Puto el que lo lea");
    }
  };

  return (
    <section className={styles.loginPage}>
      <GoHomeButton />

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
              autoComplete="off"
              className={inputError.email ? styles.loginFormInputError : ""}
              type="email"
              id="email"
              name="email"
              value={input.email}
              onChange={handleInputChange}
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
              value={input.password}
              onChange={handleInputChange}
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

          <Link to="/">¿Olvidaste tu contraseña?</Link>

          <button type="submit">Iniciar sesión</button>
        </form>

        <button
          className={styles.googleBtn}
          onClick={() => {
            alert("¿Cómo vamos hacer esto mis panas?");
          }}
        >
          <FcGoogle />
          Iniciar sesión con Google
        </button>

        <Link to="/register">¿No tienes cuenta? Registrate</Link>
      </div>
    </section>
  );
}
