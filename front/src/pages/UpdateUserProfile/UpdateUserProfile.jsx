import { useState } from "react";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import styles from "./UpdateUserProfile.module.scss";
import regex from "../../helpers/regex";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import {
  FaBirthdayCake,
  FaEnvelope,
  FaHome,
  FaPassport,
  FaPhone,
  FaPhotoVideo,
  FaUserAlt,
} from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import swal from "sweetalert";
import { Link } from "react-router-dom";

export default function UpdateUserProfile() {
  const [input, setInput] = useState({
    dni: "",
    bDate: "",
    email: "",
    name: "",
    lastName: "",
    phone: "",
    adress: "",
    password: "",
    confirmPassword: "",
    photoURL: "",
  });

  const [inputError, setInputError] = useState({
    dni: false,
    bDate: false,
    email: false,
    name: false,
    lastName: false,
    phone: false,
    adress: false,
    password: false,
    confirmPassword: false,
    photoURL: false,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure?",
      // text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });
  };

  return (
    <section className={styles.updatePage}>
      <GoHomeButton />
      <div className={styles.updatePageContent}>
        <img src={logo} alt="Dev-Sky logo" />
        <h2 className={styles.updatePageTitle}>Actualizar perfil</h2>
        <form
          className={styles.updatePageForm}
          onSubmit={(e) => handleSubmit(e)}
        >
          {/* --------- Name ------------ */}
          <div className={styles.updatePageFormInput}>
            <FaUserAlt
              className={
                inputError.name
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="name">Nombre</label>
            <input
              autoComplete="off"
              className={inputError.name ? styles.updatePageFormInputError : ""}
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
              <span className={styles.updatePageFormInputErrorMessage}>
                Ingrese un nombre entre 3 y 40 caracteres
              </span>
            )}
          </div>

          {/* --------- Last Name --------- */}
          <div className={styles.updatePageFormInput}>
            <FaUserAlt
              className={
                inputError.lastName
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="lastName">Apellido</label>
            <input
              autoComplete="off"
              className={
                inputError.lastName ? styles.updatePageFormInputError : ""
              }
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
              <span className={styles.updatePageFormInputErrorMessage}>
                Ingrese un apellido entre 3 y 40 caracteres
              </span>
            )}
          </div>

          {/* --------- Email ---------- */}
          <div className={styles.updatePageFormInput}>
            <FaEnvelope
              className={
                inputError.email
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="email">Email</label>
            <input
              autoComplete="on"
              className={
                inputError.email ? styles.updatePageFormInputError : ""
              }
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
              <span className={styles.updatePageFormInputErrorMessage}>
                Ingrese un email válido ej: correo@example.com
              </span>
            )}
          </div>

          {/* --------- Foto de perfil ------------ */}
          <div className={styles.updatePageFormInput}>
            <FaPhotoVideo
              className={
                inputError.photoURL
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="photoURL">Foto de perfil</label>
            <input
              autoComplete="off"
              className={
                inputError.photoURL ? styles.updatePageFormInputError : ""
              }
              type="photoURL"
              id="photoURL"
              name="photoURL"
              value={input.photoURL}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                const id = e.currentTarget.id;
                const value = e.currentTarget.value;
                onKeyUpValidation({ id, value });
              }}
              placeholder="https://foto-de-perfil.jpg"
            />
          </div>
          {/* --------- Phone ------------ */}
          <div className={styles.updatePageFormInput}>
            <FaPhone
              className={
                inputError.phone
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="phone">Número de teléfono</label>
            <input
              autoComplete="off"
              className={
                inputError.phone ? styles.updatePageFormInputError : ""
              }
              type="phone"
              id="phone"
              name="phone"
              value={input.phone}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                const id = e.currentTarget.id;
                const value = e.currentTarget.value;
                onKeyUpValidation({ id, value });
              }}
              placeholder="Ingrese su número de teléfono"
            />
            {inputError.phone && (
              <span className={styles.updatePageFormInputErrorMessage}>
                Ingrese un número celular entre 8 y 9 dígitos
              </span>
            )}
          </div>
          {/* --------- DNI ------------ */}
          <div className={styles.updatePageFormInput}>
            <FaPassport
              className={
                inputError.dni
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="dni">DNI</label>
            <input
              autoComplete="off"
              className={inputError.dni ? styles.updatePageFormInputError : ""}
              type="dni"
              id="dni"
              name="dni"
              value={input.dni}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                const id = e.currentTarget.id;
                const value = e.currentTarget.value;
                onKeyUpValidation({ id, value });
              }}
              placeholder="Ingrese su DNI"
            />
            {inputError.dni && (
              <span className={styles.updatePageFormInputErrorMessage}>
                Ingrese un dni entre 6 y 12 caracteres
              </span>
            )}
          </div>
          {/* --------- Dirección ------------ */}
          <div className={styles.updatePageFormInput}>
            <FaHome
              className={
                inputError.adress
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="adress">Dirección</label>
            <input
              autoComplete="off"
              className={
                inputError.adress ? styles.updatePageFormInputError : ""
              }
              type="text"
              id="adress"
              name="adress"
              value={input.adress}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                const id = e.currentTarget.id;
                const value = e.currentTarget.value;
                onKeyUpValidation({ id, value });
              }}
              placeholder="Ingrese su dirección"
            />
            {inputError.adress && (
              <span className={styles.updatePageFormInputErrorMessage}>
                Ingrese una dirección entre 6 y 40 caracteres
              </span>
            )}
          </div>
          {/* --------- Birthday date ------------ */}
          <div className={styles.updatePageFormInput}>
            <FaBirthdayCake
              className={
                inputError.bDate
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="bDate">Fecha de nacimiento</label>
            <input
              autoComplete="off"
              className={
                inputError.bDate ? styles.updatePageFormInputError : ""
              }
              type="date"
              id="bDate"
              name="bDate"
              value={input.bDate}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                const id = e.currentTarget.id;
                const value = e.currentTarget.value;
                onKeyUpValidation({ id, value });
              }}
            />
            {inputError.bDate && (
              <span className={styles.updatePageFormInputErrorMessage}>
                Ingrese una fecha de nacimiento valida
              </span>
            )}
          </div>

          {/* --------- Password ------------ */}
          <div className={styles.updatePageFormInput}>
            <RiLockPasswordFill
              className={
                inputError.password
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="password">Password</label>
            <input
              className={
                inputError.password ? styles.updatePageFormInputError : ""
              }
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
              <span className={styles.updatePageFormInputErrorMessage}>
                Ingrese una contraseña entre 6 y 16 caracteres
              </span>
            )}
          </div>

          {/* -------  Confirm Password ---------- */}
          <div className={styles.updatePageFormInput}>
            <RiLockPasswordFill
              className={
                inputError.confirmPassword
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="confirmPassword">Password</label>
            <input
              className={
                inputError.confirmPassword
                  ? styles.updatePageFormInputError
                  : ""
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
              <span className={styles.updatePageFormInputErrorMessage}>
                Debe coincidir con la contraseña
              </span>
            )}
          </div>
          <div className={styles.updatePageButtonsContainer}>
            <Link to="/user">
              <button type="submit">Cancelar</button>
            </Link>
            <button type="submit">Actualizar perfil</button>
          </div>
        </form>
      </div>
    </section>
  );
}
