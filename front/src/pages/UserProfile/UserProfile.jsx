import styles from "./UserProfile.module.scss";
import noImgProfile from "../../assets/noImgProfile2.jpg";
import { BiLogOut } from "react-icons/bi";
import { Link, useHistory } from "react-router-dom";
import { createRef, useEffect, useState } from "react";
import { auth, db, logout } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
// import FavCard from "./favCard";
import { getFavs, isAvailable, resetUserProfile } from "../../redux/actions";

export default function UserProfile(documentPath) {
  const [user, loading, error] = useAuthState(auth);
  const [usuario, setUsuario] = useState([]);
  const dispatch = useDispatch();
  const favs = useSelector((state) => state.favs);
  const yetAvailable = useSelector((state) => state.availableFlight);
  const history = useHistory();
  const [fav, setFav] = useState({});

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    getUser();
    dispatch(getFavs(user.uid));
  }, [loading, user]);

  useEffect(() => {
    console.log(yetAvailable)
    if (yetAvailable.cabin) { 
      if (window.confirm("El vuelo esta disponible, desea comprarlo?")) {
        dispatch(resetUserProfile());
        history.push({
          pathname: `/offer-detail/${yetAvailable.offers}`,
          state: { ...fav[0] },
        });
      }
    }
  }, [yetAvailable]);



  useEffect(() => {
    return () => {
      dispatch(resetUserProfile());
    };
  }, []);



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
      text: "Si confirmas, la cuenta sera borrada y no se podrá recuperar.",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isConfirm) => {
      if (isConfirm) {
        swal("Exito!", "La cuenta ah sido borrada!", "success");
        db.collection("users")
          .doc(usuario[0].id)
          .delete()
          .then((r) =>
            firebase
              .auth()
              .currentUser.delete()
              .catch(function(error) {
                swal("Error!", "No se pudo borrar la cuenta!", "error");
              })
          );
      } else {
        swal("Cancelado", "Su Cuenta no fue borrada", "error");
      }
    });
  };

  const available = async (e) => {
    e.preventDefault();
    const filter = favs.filter((fav) => fav.offers === e.target.value)
    setFav(filter);
     dispatch(isAvailable(filter))
  };

  const borrarFav = (e) => {
    e.preventDefault();
    swal({
      title: "Esta seguro?",
      text: "Esta seguro que desea eliminar el favorito?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isConfirm) => {
      if (isConfirm) {
        // swal("Eliminado!", "El vuelo ha sido eliminado", "success");
        db.collection("saves")
          .doc(e.target.value)
          .delete()
          .then(() => {
            swal(
              "Exito!",
              "el favorito ha sido borrado exitosamente",
              "success"
            );
           dispatch(getFavs(user.uid));
          })
          .catch((error) => {
            swal("Error!", "No se pudo borrar la cuenta!", "error");
          });
      } else {
        swal("Cancelado", "El favorito no ha sido eliminado", "error");
      }
    });
  };

  const buscarParecidos= (e) => {
    e.preventDefault();
    const filter = favs.filter((fav) => fav.offers === e.target.value)
    history.push(`/offers?origin=${filter[0].origin}&destination=${filter[0].destination}&dDate=${filter[0].dDate}&adults=${filter[0].adults}&childs=${filter[0].childs}&baby=${filter[0].baby}&cabin=${filter[0].cabin}`)
  }

  const render = () => { 
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
                  <div className={styles.favCardContainer}>
                    {favs?.map((fav) => {
                      console.log(favs)
                      return (
                        <div className={styles.favCard} key={fav.id}>
                          <div className={styles.cities}><p>{fav.originCity}</p>
                          <p>{fav.destinationCity}</p></div>
                          <button className={styles.delete}value={fav.iddelDoc} onClick={borrarFav}>
                            X
                          </button>
                          <div className={styles.journey}>{fav.transfersD? <p>IDA Y VUELTA</p>:<p>IDA</p> }</div>
                          <div className={styles.price}>{`U$D${fav.price}`}</div>
                         <div className={styles.buttons}> <button value={fav.offers} onClick={available}>
                            ¿Sigue disponible?
                          </button>
                          <button value= {fav.offers} onClick={buscarParecidos}>Buscar similares</button>
                        </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h1>Mis tickets</h1>
            </div>

            <div className={styles.button}>
              <div className={styles.btn}>
                <button type="submit" onClick={(e) => userDelete(e)}>
                  Eliminar cuenta
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    )
  }
  return (
    <div>
      {usuario[0]?.photoURL? render():   <LoadingScreen />}
    </div>
  );
}
