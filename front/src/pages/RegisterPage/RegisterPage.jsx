import { ChangeEvent, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { FcGoogle } from "react-icons/fc";
import { FaEnvelope, FaUserAlt } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import styles from "./RegisterPage.module.scss";
import regex from "../../helpers/regex";
import "firebase/auth";
import {
  auth,
  db,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../firebaseConfig";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";

export default function RegisterPage() {
  const [input, setInput] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputError, setInputError] = useState({
    name: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const onKeyUpValidation = ({ id, value }) => {
    switch (id) {
      case "name":
        if (regex.name.test(value.trim())) {
          setInputError({ ...inputError, [id]: false });
        } else setInputError({ ...inputError, [id]: true });
        break;
      case "lastName":
        if (regex.lastName.test(value.trim())) {
          setInputError({ ...inputError, [id]: false });
        } else setInputError({ ...inputError, [id]: true });
        break;
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
      case "confirmPassword":
        if (
          regex.confirmPassword.test(value.trim()) &&
          value === input.password
        ) {
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

  const validateForm = () => {
    let isValid = false;
    const { name, lastName, email, password, confirmPassword } = input;

    if (
      name === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      confirmPassword !== password
    ) {
      setInputError({
        name: name === "" ? true : false,
        lastName: lastName === "" ? true : false,
        email: email === "" ? true : false,
        password: password === "" ? true : false,
        confirmPassword:
          confirmPassword === "" || confirmPassword !== password ? true : false,
      });
    } else isValid = true;
    return isValid;
  };

  const resetForm = () => {
    setInput({
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setInputError({
      name: false,
      lastName: false,
      email: false,
      password: false,
      confirmPassword: false,
    });
  };

  const history = useHistory();

  const newUser = async (data) => {
    await registerWithEmailAndPassword(input.email, input.password)
      .then(() => {
        db.collection("users").doc().set(data);
        resetForm();
        history.push("/");
        alert("Usuario registrado con exito");
      })
      .catch((error) => {
        alert(error.message);
      });
    console.log("nuevo usuario registrado");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    newUser(input).then((r) => console.log(r));
    if (validateForm()) {
      resetForm();
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
          {/* --------- Name ------------ */}
          <div className={styles.loginFormInput}>
            <FaUserAlt
              className={
                inputError.name
                  ? styles.loginFormInputIcon +
                    " " +
                    styles.loginFormInputIconError
                  : styles.loginFormInputIcon
              }
            />
            <label htmlFor="name">Nombre</label>
            <input
              autoComplete="off"
              className={inputError.name ? styles.loginFormInputError : ""}
              type="text"
              id="name"
              name="name"
              value={input.name}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                const id = e.currentTarget.id;
                const value = e.currentTarget.value;
                onKeyUpValidation({ id, value });
              }}
              placeholder="Ingrese su nombre"
            />
            {inputError.name && (
              <span className={styles.loginFormInputErrorMessage}>
                Ingrese un nombre entre 3 y 40 caracteres
              </span>
            )}
          </div>

          {/* --------- Last Name --------- */}
          <div className={styles.loginFormInput}>
            <FaUserAlt
              className={
                inputError.lastName
                  ? styles.loginFormInputIcon +
                    " " +
                    styles.loginFormInputIconError
                  : styles.loginFormInputIcon
              }
            />
            <label htmlFor="last-name">Apellido</label>
            <input
              autoComplete="off"
              className={inputError.lastName ? styles.loginFormInputError : ""}
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Ingrese su apellido"
              value={input.lastName}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                const id = e.currentTarget.id;
                const value = e.currentTarget.value;
                onKeyUpValidation({ id, value });
              }}
            />
            {inputError.lastName && (
              <span className={styles.loginFormInputErrorMessage}>
                Ingrese un apellido entre 3 y 40 caracteres
              </span>
            )}
          </div>

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

          {/* -------  Confirm Password ---------- */}
          <div className={styles.loginFormInput}>
            <RiLockPasswordFill
              className={
                inputError.confirmPassword
                  ? styles.loginFormInputIcon +
                    " " +
                    styles.loginFormInputIconError
                  : styles.loginFormInputIcon
              }
            />
            <label htmlFor="confirmPassword">Password</label>
            <input
              className={
                inputError.confirmPassword ? styles.loginFormInputError : ""
              }
              type="password"
              placeholder="confirme la contraseña"
              id="confirmPassword"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                const id = e.currentTarget.id;
                const value = e.currentTarget.value;
                onKeyUpValidation({ id, value });
              }}
            />
            {inputError.confirmPassword && (
              <span className={styles.loginFormInputErrorMessage}>
                Debe coincidir con la contraseña
              </span>
            )}
          </div>

          <button type="submit">Registrarse</button>
        </form>

        <button className={styles.googleBtn} onClick={signInWithGoogle}>
          <FcGoogle />
          Continuar con Google
        </button>
        <Link to="/login">¿Ya tienes una cuenta? Inicia sesión</Link>
      </div>
    </section>
  );
}
