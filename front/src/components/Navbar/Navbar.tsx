import styles from "./Navbar.module.scss";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  return (
    <div className={styles.navBar}>
      <nav className={styles.nav}>
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
        <div className={styles.user}>
          <Link className={styles.userLink} to="/login">
            <FontAwesomeIcon icon={faUserCircle} size="2x" />
            <span>Iniciar Sesion</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
