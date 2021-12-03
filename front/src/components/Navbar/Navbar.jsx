import styles from "./Navbar.module.scss";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {auth, db, logout} from "../../firebaseConfig";
import {useEffect, useState} from "react";


export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(async ()=> {
    await auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className={styles.navBar}>
      <nav className={styles.nav}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <div className={styles.user}>
          {
            auth.currentUser ?
              <div className={styles.user}>
                <FontAwesomeIcon icon={faUserCircle} />
                <Link className={styles.userLink}  to="/user">
                  <span>Perfil</span>
                </Link>
                <Link className={styles.userLink}  to="/">
                  <span onClick={logout}>Cerrar Sesión</span>
                </Link>
              </div>

              :

              <div className={styles.user}>
                <Link className={styles.userLink} to="/login" >
                  <FontAwesomeIcon icon={faUserCircle} size="2x" />
                  <span>Iniciar Sesión</span>
                </Link>
                <Link className={styles.userLink} to="/register" >
                  <span>Registrarse</span>
                </Link>
              </div>
          }
        </div>
      </nav>
    </div>
  );
}