import styles from "./UserProfile.module.scss";
import {Link, useHistory} from "react-router-dom";
import {createRef, useEffect, useState} from "react";
import {auth, db, logout} from "../../firebaseConfig";
import {useAuthState} from "react-firebase-hooks/auth";
import firebase from "firebase/app";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";


export default function UserProfile(documentPath) {

  const [user, loading, error] = useAuthState(auth);
  const [usuario, setUsuario] = useState([]);

  const history = useHistory();

  const getUser = () => {
      db.collection("users").onSnapshot((querySnapshot) => {
        const docs = [];
          querySnapshot.forEach(doc => {
            docs.push({...doc.data(), id: doc.id});
          })
        const filtrado = docs.filter(doc => doc.email === user.email);
          console.log(filtrado);
        setUsuario(filtrado);
        console.log(docs);
      });
  };

  const userDelete = () => {
    if(window.confirm("¿Estás seguro de que quieres eliminar tu cuenta?"))
      {
        db.collection('users').doc(usuario[0].id).delete().then(r =>
          console.log("Document successfully deleted!")
        ).catch(e =>
            console.log(usuario[0].uid),
        )
      firebase.auth().currentUser
        .delete().then(() => {
          history.push("/");
          alert("El usuario ha eliminado");
        }).catch((error) => {
          alert("Error al eliminar usuario");
      })
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return history.replace("/");
    getUser()
  }, [user, loading, history]);


  return (
    <div className={styles.pageContainer} >
      <GoHomeButton/>
      {usuario.map((dato) => {
        return (
          <div className={styles.userProfileContainer} key={dato.id}>
            {/* Contenedor de imagen y nombre */}
            <div className={styles.imgAndNameContainer}>
              <a title="FotoPerfil">
                <img
                    id="imgUserProfile"
                    src={dato.photoURL}
                    alt="Sin Imagen"
                /></a>
              <h1>
                {dato.name} {dato.lastName}
              </h1>
            </div>
            {/* Contendor de tarjetas de opciones */}
            <div className={styles.cardOptionsContainer}>
              <div className={styles.card}>
                <h1> Mis datos</h1>
                <div className={styles.cardOptions}>
                  <h3>Dni: {dato.dni}</h3>
                  <h3>Fecha de nacimiento: {dato.bDate}</h3>
                  <h3>Mail: {dato.email}</h3>
                  <h3>Nº de Teléfono: {dato.phone}</h3>
                </div>
              </div>

              <div className={styles.card}>
                <h1>Mis favs</h1>

                  <div className={styles.cardOptions}>
                    <h3>Favos</h3>
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
                <button className={styles.btn1} onClick={logout} >Cerrar sesión</button>
                <Link to="/user/update">
                <button className={styles.btn1} >Actualizar Cuenta</button>
                </Link>
                <button className={styles.btn} onClick={userDelete}>Eliminar cuenta</button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
