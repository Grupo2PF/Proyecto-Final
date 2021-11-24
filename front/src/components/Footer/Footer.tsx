import { Link } from "react-router-dom";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.FooterContent}>
        <img src={logo} alt="Dev-Sky Logo" />
        <p>
          &copy; 2021 Dev-Sky. <br /> Todos los derechos reservados.
        </p>
        <Link to="/about-us">Sobre nosotros</Link>
      </div>
    </footer>
  );
}
