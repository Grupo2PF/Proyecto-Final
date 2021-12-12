import styles from "./UserProfile.module.scss";
import noImgProfile from "../../assets/noImgProfile2.jpg";
import { BiLogOut } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { createRef, useEffect, useState } from "react";
import { auth, db, logout } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { getFavs} from "../../redux/actions";
import firebase from "firebase/app";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import FavCard from "./favCard"


export default function UserProfile(documentPath) {
  const [user, loading, error] = useAuthState(auth);
  const [usuario, setUsuario] = useState([]);
  const dispatch = useDispatch();
  const favs = useSelector(state => state.favs);

  const history = useHistory();

  const getUser = () => {
    db.collection("users").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      const filtrado = docs.filter((doc) => doc.email === user.email);
      setUsuario(filtrado);
    });
  };


  const userDelete = (e) => {
    e.preventDefault();
    swal({
      title: "Estas Seguro?",
      text: "Si confirmas la cuenta sera borrada y no se podrá recuperar.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isConfirm) => {
      if (isConfirm) {
        swal("Exito!", "La cuenta ah sido borrada!", "success");
        db.collection("users").doc(usuario[0].id).delete()
          .then((r) => firebase.auth().currentUser.delete()
              .catch(function (error) {
                swal("Error!", "No se pudo borrar la cuenta!", "error");
              })
          );
      } else {
        swal("Cancelado", "Su Cuenta no fue borrada", "error");
      }
    });
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    getUser();
    dispatch(getFavs(user.uid));
  }, [user, loading, history, favs]);

  return (
    <div className={styles.pageContainer}>
      <GoHomeButton />
      {usuario.map((dato) => {
        return (
          <div className={styles.userProfileContainer} key={dato.id}>
            {/* Contenedor de imagen y nombre */}

            <div className={styles.imgAndNameContainer}>
              <div className={styles.ProfileImg} title="FotoPerfil">
                {dato.photoURL ? (
                  <img
                    id="imgUserProfile"
                    src={dato.photoURL}
                    alt="Sin Imagen"
                  />
                ) : (
                  <img
                    className={styles.imgAndNameContainer}
                    id="imgUserProfile"
                    src={noImgProfile}
                    alt="Sin Imagen"
                  />
                )}
              </div>

              <div className={styles.h1LogoutBox}>
                <div className={styles.LogoutBox}>
                  <button className={styles.btnLogout} onClick={logout}>
                    <BiLogOut className={styles.icon} />
                    <p>Cerrar sesión</p>
                  </button>
                </div>
                <h1>
                  {dato.name} {dato.lastName}
                </h1>
              </div>
            </div>
            {/* Contendor de tarjetas de opciones */}
            <div className={styles.cardOptionsContainer}>
              <div className={styles.card}>
                <h1> Mis datos</h1>
                <div className={styles.cardOptions}>
                  <div className={styles.textBox}>
                    <h3>Dni :</h3>
                    <p> {dato.dni}</p>
                  </div>

                  <div className={styles.textBox}>
                    <h3>Fecha de nacimiento :</h3>
                    <p>{dato.bDate}</p>
                  </div>

                  <div className={styles.textBox}>
                    <h3>Mail :</h3>
                    <p>{dato.email}</p>
                  </div>

                  <div className={styles.textBox}>
                    <h3>Nº de Teléfono :</h3>
                    <p>{dato.phone}</p>
                  </div>
                </div>
                <div className={styles.btnUpdateBox}>
                  <Link className={styles.btnLink} to="/user/update">
                    Actualizar Cuenta
                  </Link>
                </div>
              </div>

              <div className={styles.card}>
                <h1>Mis favs</h1>

                <div
                  className={styles.cardOptions + " " + styles.cardOptionsFavs}
                >
                  <div><FavCard/></div>
                </div>
              </div>

              <div className={styles.card}>
                <h1>Mis tickets</h1>
                {/* {dato.tik.map((e) => (
                  <div className={styles.cardOptions}>
                    <h3>{e.originCity}</h3>
                    <h3>{e.destinyCity}</h3>
                    <h3>{e.departureDate}</h3>
                    <h3>{e.returnDate}</h3>
                    <h3>{e.journeyType}</h3>
                    <h3>{e.class}</h3>
                  </div>
                ))}*/}
              </div>

              <div className={styles.button}>
                <div className={styles.btn}>
                  <button type="submit" onClick={(e) => userDelete(e)}>
                    Eliminar cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
