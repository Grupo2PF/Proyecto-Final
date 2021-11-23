import  styles  from "./Navbar.module.scss"
import logo from "../../assets/logo/dev-sky-black-logo.svg"

export default function Navbar() {
    return (
        <div>
            <nav className={styles.navContainer}>
                <img src={logo} alt="" className={styles.logo} />
                <ul className={styles.ul}>
                    <li className={styles.li}>
                        <a href="/sesion" className={styles.a} > Iniciar Sesion </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
