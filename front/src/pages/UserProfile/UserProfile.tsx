import datos from "./us";
import styles from "./UserProfile.module.scss";
import { useHistory } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import {useCallback, useEffect, useState} from "react";
import {auth, db, logout} from "../../firebaseConfig";
import {useAuthState} from "react-firebase-hooks/auth";


export default function UserProfile(): JSX.Element {

  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const history = useHistory();

  const fetchUserName = async () => {
    try {
      const query = await db
          .collection("users")
          .where("uid", "==", user?.uid)
          .get();
      const data = await query.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
      alert("An error occurred while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    fetchUserName().then(r =>
      console.log(r)
    );
  }, [user, loading, history, fetchUserName]);



  return (
    <div className={styles.pageContainer}>
      <Navbar />
      {datos.map((dato): JSX.Element => {
        return (
          <div className={styles.userProfileContainer}>
            {/* Contenedor de imagen y nombre */}
            <div className={styles.imgAndNameContainer}>
              <img src={dato.img} alt="Sin imagen" />
              <h1>
                {name}
              </h1>
            </div>
            {/* Contendor de tarjetas de opciones */}
            <div className={styles.cardOptionsContainer}>
              <div className={styles.card}>
                <h1> Mis datos</h1>
                <div className={styles.cardOptions}>
                  <h3>Dni: {dato.dni}</h3>
                  <h3>Fecha de nacimiento: {dato.bDate}</h3>
                  <h3>Mail: {user?.email}</h3>
                  <h3>Nº de Teléfono: {dato.phone}</h3>
                </div>
              </div>

              <div className={styles.card}>
                <h1>Mis favs</h1>
                {dato.fav.map((e: any) => (
                  <div className={styles.cardOptions}>
                    <h3>{e.name}</h3>
                  </div>
                ))}
              </div>

              <div className={styles.card}>
                <h1>Mis tickets</h1>
                {dato.tik.map((e: any) => (
                  <div className={styles.cardOptions}>
                    <h3>{e.originCity}</h3>
                    <h3>{e.destinyCity}</h3>
                    <h3>{e.departureDate}</h3>
                    <h3>{e.returnDate}</h3>
                    <h3>{e.journeyType}</h3>
                    <h3>{e.class}</h3>
                  </div>
                ))}
              </div>

              <div className={styles.button}>
                <button className={styles.btn1} onClick={logout} >Cerrar sesión</button>
                <button className={styles.btn}>Eliminar cuenta</button>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
