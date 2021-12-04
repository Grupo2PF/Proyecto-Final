import { useEffect, useState } from "react";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import styles from "./UpdateUserProfile.module.scss";
import regex from "../../helpers/regex";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import {
  FaBirthdayCake,
  FaEnvelope,
  FaFileUpload,
  FaHome,
  FaPassport,
  FaPhone,
  FaPhotoVideo,
  FaUserAlt,
} from "react-icons/fa";
import swal from "sweetalert";
import { Link, useHistory } from "react-router-dom";
import { auth, db, storage } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

export default function UpdateUserProfile() {
  const [input, setInput] = useState({
    dni: "",
    bDate: "",
    email: "",
    name: "",
    lastName: "",
    phone: "",
    address: "",
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
    address: false,
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
        }).then(r => console.log(r));
      } else {
        swal("Your imaginary file is safe!").then(r => console.log(r));
      }
    });
  };

  const [user, loading, error] = useAuthState(auth);
  const [usuario, setUsuario] = useState([]);
  const [value, setValue] = useState({uploadValue: 0, picture: null})

  const history = useHistory();

  const handleUpload = (e) => {
      const image = e.target.files[0];
      const storageRef = storage.ref(`/imageProfile/${image.name}`);
      const task = storageRef.put(image);

      task.on('state_changed',
          snapshot => {
              const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(percentage);
              setValue({uploadValue: percentage, picture: image})
          },
          error => {
              console.log(error.message);
          },
          () => {
              setValue({
                  uploadValue: 100,
                  picture: task.snapshot.ref.fullPath
              });
              task.snapshot.ref.getDownloadURL().then(url => {
                  setInput({...input, photoURL: url})
              })
          }
      )
  }

    const getUser = () => { db.collection("users").onSnapshot((querySnapshot) => {

    const docs = [];
      querySnapshot.forEach(doc => {
        docs.push({...doc.data(), id: doc.id});
      });
      const filtrado = docs.filter(doc => doc.email === user.email);
      setUsuario(filtrado);
      console.log(usuario);

    });
  };

  const updateUser = () => {
    db.collection("users")
      .doc(usuario[0].id)
      .update({
        dni: input.dni,
        bDate: input.bDate,
        name: input.name,
        lastName: input.lastName,
        phone: input.phone,
        address: input.address,
        photoURL: input.photoURL,
      })
      .then((r) => {
        swal({
          title: "Datos actualizados",
          icon: "success",
          button: "Ok",
        }).then((r) => history.push("/user"));
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    getUser()
  }, [user, loading, history]);

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
              required
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
              required
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
              required
              autoComplete="off"
              className={
                inputError.photoURL ? styles.updatePageFormInputError : ""
              }
              type="text"
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
            <progress value={value.uploadValue} max="100" />
          <button className={styles.inputFile}>
            <FaFileUpload />
            Cargar imagen
            <input
              className={styles.inputFileBtn}
              type="file"
              id="photoURL"
              name="photoURL"
              onChange={handleUpload}
            />
          </button>
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
              required
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
              required
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
                inputError.address
                  ? styles.updatePageFormInputIcon +
                    " " +
                    styles.updatePageFormInputIconError
                  : styles.updatePageFormInputIcon
              }
            />
            <label htmlFor="address">Dirección</label>
            <input
              required
              autoComplete="off"
              className={
                inputError.address ? styles.updatePageFormInputError : ""
              }
              type="text"
              id="address"
              name="address"
              value={input.address}
              onChange={handleInputChange}
              onKeyUp={(e) => {
                const id = e.currentTarget.id;
                const value = e.currentTarget.value;
                onKeyUpValidation({ id, value });
              }}
              placeholder="Ingrese su dirección"
            />
            {inputError.address && (
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
              required
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
          <div className={styles.updatePageButtonsContainer}>
            <Link to="/user">
              <button type="submit">Cancelar</button>
            </Link>
            <button type="submit" onClick={updateUser}>
              Actualizar perfil
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
