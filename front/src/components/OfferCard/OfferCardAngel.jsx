import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { BsArrowLeftRight } from "react-icons/bs";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import styles from "./OfferCardAngel.module.scss";
export default function OfferCardAngel() {
  return (
    <>
      <Navbar />
      <header className={styles.heroSection}>
        <h1>
          Las mejores ofertas en vuelos desde Buenos Aires hacia Barcelona
        </h1>
      </header>

      <main className={styles.offers}>
        <h1>Ofertas disponibles</h1>

        <section className={styles.offersCards}>
          <div className={styles.offersCard}>
            <div className={styles.offersCardMainInfo}>
              {/* Puntos de partida y llegada */}
              <div className={styles.offersCardInfo}>
                <p>
                  <FaPlaneArrival /> Buenos Aires{" "}
                </p>
                <p>
                  <FaPlaneDeparture /> Barcelona{" "}
                </p>
              </div>

              {/* Tipo de vuelo */}
              <div className={styles.offersCardType}>
                <BsArrowLeftRight />
                Tiene 2 escalas
              </div>
              {/* Buttons */}
              <div className={styles.offersCardButtons}>
                <button>
                  <AiOutlineExclamationCircle />
                  Ver detalles
                </button>
                <button className={styles.offersCardButtonsPrice}>
                  USD 194.98
                </button>
              </div>
            </div>
          </div>
          <div className={styles.offersCard}>
            <div className={styles.offersCardMainInfo}>
              {/* Puntos de partida y llegada */}
              <div className={styles.offersCardInfo}>
                <p>
                  <FaPlaneArrival /> Buenos Aires{" "}
                </p>
                <p>
                  <FaPlaneDeparture /> Barcelona{" "}
                </p>
              </div>

              {/* Tipo de vuelo */}
              <div className={styles.offersCardType}>
                <BsArrowLeftRight />
                Tiene 2 escalas
              </div>
              {/* Buttons */}
              <div className={styles.offersCardButtons}>
                <button>
                  <AiOutlineExclamationCircle />
                  Ver detalles
                </button>
                <button className={styles.offersCardButtonsPrice}>
                  USD 194.98
                </button>
              </div>
            </div>
          </div>
          <div className={styles.offersCard}>
            <div className={styles.offersCardMainInfo}>
              {/* Puntos de partida y llegada */}
              <div className={styles.offersCardInfo}>
                <p>
                  <FaPlaneArrival /> Buenos Aires{" "}
                </p>
                <p>
                  <FaPlaneDeparture /> Barcelona{" "}
                </p>
              </div>

              {/* Tipo de vuelo */}
              <div className={styles.offersCardType}>
                <BsArrowLeftRight />
                Tiene 2 escalas
              </div>
              {/* Buttons */}
              <div className={styles.offersCardButtons}>
                <button>
                  <AiOutlineExclamationCircle />
                  Ver detalles
                </button>
                <button className={styles.offersCardButtonsPrice}>
                  USD 194.98
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
