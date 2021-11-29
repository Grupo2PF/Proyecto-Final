import styles from "./Navbar.module.scss";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import {auth, db, logout} from "../../firebaseConfig";

export default function Navbar() {

  const loggedOutLinks = document.querySelectorAll('.logged-out');
  const loggedInLinks = document.querySelectorAll('.logged-in');

  const setupUI = (user) => {
    if (user) {
      loggedInLinks.forEach(item => item.style.display = 'block');
      loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
      loggedInLinks.forEach(item => item.style.display = 'none');
      loggedOutLinks.forEach(item => item.style.display = 'block');
    }
  };

  auth.onAuthStateChanged(user => {
    if (user){
      db.collection('users').get().then(snapshot => {
            setupUI(user);
      });
    }else{
      setupUI();
    }
  });


  return (
    <div className={styles.navBar}>
      <nav className={styles.nav}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <div className={styles.user}>
          <Link class="logged-out" className={styles.userLink} to="/login" >
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
            <span className="logged-out">Iniciar Sesión</span>
          </Link>
          <Link class="logged-out" className={styles.userLink} to="/register" >
            <span className="logged-out">Registrarse</span>
          </Link>
          <Link className={styles.userLink}  to="/user">
            <span className="logged-in">Cuenta</span>
          </Link>
          <Link className={styles.userLink}  to="/">
            <span className="logged-in" onClick={logout}>Cerrar Sesión</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}