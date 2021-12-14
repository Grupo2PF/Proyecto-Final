import styles from "./UserProfile.module.scss";
import noImgProfile from "../../assets/noImgProfile2.jpg";

import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth, db, logout } from "../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import swal from "sweetalert";
import { useSelector, useDispatch } from "react-redux";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import { getFavs, isAvailable, resetUserProfile } from "../../redux/actions";
import Spinner from "../../components/Spinner/Spinner";

export default function UserProfile(documentPath) {
  const [user, loading, error] = useAuthState(auth);
  const [usuario, setUsuario] = useState([]);
  const dispatch = useDispatch();
  const favs = useSelector((state) => state.favs);
  const yetAvailable = useSelector((state) => state.availableFlight);
  const history = useHistory();
  const [fav, setFav] = useState({});
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    getUser();
    dispatch(getFavs(user.uid));
  }, [loading, user]);

  useEffect(() => {
    if (yetAvailable.cabin) {
      setCargando(false);
      swal({
        title: "El vuelo esta disponible!",
        text: "¿Desea comprarlo?",
        icon: "success",
        buttons: true,
        dangerMode: true,
      })
          .then((willDelete) => {
            if (willDelete) {
              dispatch(resetUserProfile());
              history.push({
                pathname: `/offer-detail/${yetAvailable.offers}`,
                state: { ...fav[0] },
              });
            }
          })
    }else if(yetAvailable === "error"){
      swal({
        title: "El vuelo ya no esta disponible!",
        text: "",
        icon: "error",
        button: "Volver",
      })
          .then((value) => {
            setCargando(false);
            dispatch(resetUserProfile());
            dispatch(getFavs(user.uid));
          });
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
      text: "Si confirmas la cuenta sera borrada y no se podrá recuperar.",
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

  const available = (e) => {
    e.preventDefault();
    setCargando(true);
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

  const buscarParecidos = (e) => {
    e.preventDefault();
    const filter = favs.filter((fav) => fav.offers === e.target.value);
    history.push(
        `/offers?origin=${filter[0].origin}&destination=${filter[0].destination}&dDate=${filter[0].dDate}&adults=${filter[0].adults}&childs=${filter[0].childs}&baby=${filter[0].baby}&cabin=${filter[0].cabin}`
    );
  };

  const render = () => {
    return (
        <div className={styles.user}>
          <GoHomeButton />
          {usuario.map((dato) => {
            return (
                <div className={styles.userContainer} key={dato.id}>
                  {/* Contenedor de imagen y nombre */}
                  <div className={styles.userSectionImgAndName}>
                    {/* Imagen */}
                    <div className={styles.userSectionImg} title="FotoPerfil">
                      {dato.photoURL ? (
                          <img
                              id="imgUserProfile"
                              src={dato.photoURL}
                              alt="Sin Imagen"
                          />
                      ) : (
                          <img
                              id="imgUserProfile"
                              src={noImgProfile}
                              alt="Sin Imagen"
                          />
                      )}
                    </div>

                    {/* Nombre */}
                    <h1>
                      {dato.name} {dato.lastName}
                    </h1>
                  </div>

                  {/* Contendor de tarjetas de opciones */}
                  <div className={styles.cardsContainer}>
                    <div className={styles.cards}>
                      <h1> Mis datos</h1>
                      <div className={styles.card}>
                        <div className={styles.cardTextBox}>
                          <h3>Dni: </h3>
                          <p> {dato.dni}</p>
                        </div>

                        <div className={styles.cardTextBox}>
                          <h3>Mail :</h3>
                          <p>{dato.email}</p>
                        </div>

                        <div className={styles.cardTextBox}>
                          <h3>Nº de Teléfono :</h3>
                          <p>{dato.phone}</p>
                        </div>
                      </div>
                      <div className={styles.cardsUpdate}>
                        <Link
                            className={styles.cardsUpdateButton}
                            to="/user/update"
                        >
                          Actualizar Cuenta
                        </Link>
                      </div>
                    </div>

                    <div className={styles.cards}>
                      <h1>Mis favs</h1>
                      <div className={styles.cardsFavs}>
                        {favs?.map((fav) => {
                          return (
                              <div className={styles.cardFav} key={fav.id}>
                                <div key={fav.id} className={styles.cardFavButtonX}>
                                  <button
                                      key={fav.id}
                                      className={styles.cardFavButtonDelete}
                                      value={fav.iddelDoc}
                                      onClick={borrarFav}
                                  >
                                    X
                                  </button>
                                </div>

                                <div key={fav.id} className={styles.cardFavCity}>
                                  <p key={fav.id} >
                                    {fav.originCity} - {fav.destinationCity}
                                  </p>
                                </div>

                                <div key={fav.id} className={styles.cardFavJourneyAndPrice}>
                                  <div key={fav.id} className={styles.cardFavJourney}>
                                    {fav.transfersD ? (
                                        <p key={fav.id}>Tipo: Ida y vuelta</p>
                                    ) : (
                                        <p key={fav.id}>Tipo: Solo Ida</p>
                                    )}
                                  </div>
                                  <div key={fav.id} className={styles.cardFavPrice}>
                                    <p>Precio: U$D{fav.price}</p>
                                  </div>
                                </div>
                                <div key={fav.id} className={styles.cardFavButtons}>
                                  <button key={fav.id} value={fav.offers} onClick={available}>
                                    ¿Sigue disponible?
                                  </button>
                                  <button
                                  key={fav.id}
                                      value={fav.offers}
                                      onClick={buscarParecidos}
                                  >
                                    Buscar similares
                                  </button>
                                </div>
                              </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className={styles.cards}>
                      <h1>Mis tickets</h1>
                    </div>
                  </div>
                  <div key={fav.id} className={styles.buttons}>
                    <button
                        className={styles.buttonsDelete}
                        type="submit"
                        onClick={(e) => userDelete(e)}
                    >
                      Eliminar cuenta
                    </button>
                    <button className={styles.buttonsLogOut} onClick={logout}>
                      Cerrar sesión
                    </button>
                  </div>
                </div>
            );
          })}
        </div>
    );
  };
  return <div>
    {cargando && <Spinner />}
    {usuario[0]?.name? render():   <LoadingScreen />}
  </div>
}
