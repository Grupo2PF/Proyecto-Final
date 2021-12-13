import { useState } from "react";
import styles from "./RecomendationCard.module.scss";
import { useDispatch } from "react-redux";
import {
  AiOutlineExclamationCircle,
  AiOutlineFieldNumber,
} from "react-icons/ai";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import {
  BsArrowLeftRight,
  BsCalendarDateFill,
  BsCalendarDate,
} from "react-icons/bs";
import { IoMdAirplane } from "react-icons/io";
import { GiCommercialAirplane } from "react-icons/gi";
import { sendFavs } from "../../redux/actions/";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";

export default function OfferCardIV(props) {
  const [clicked, setClicked] = useState([false, "Ver detalles"]);
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!clicked[0]) {
      return setClicked([true, "Cerrar"]);
    } else {
      return setClicked([false, "Ver detalles"]);
    }
  };

  const handleFavs = (e) => {
    if (auth.currentUser) {
      const info = {
        userId: auth.currentUser.uid,
        ...props,
        // id: props.offers,
        // mode: props.mode,
        // origin: props.originCity,
        // destination: props.destinationCity,
        // originAirport: props.originAirport,
        // destinationAirport: props.destinationAirport,
        // transfers: props.transfers.length -1,
        // price: `${props.currency} ${props.price}`,
      };
      console.log("info");
      console.log(info);
      dispatch(sendFavs(info));
    } else {
      alert("Debes iniciar sesión para poder agregar a favoritos");
    }
  };

  return (
    <>
      <section className={styles.offers}>
        <div className={styles.offersCard}>
          <div className={styles.offersCardMainInfo}>
            {/* Puntos de partida y llegada */}
            <div className={styles.offersCardInfo}>
              <p>
                <FaPlaneDeparture />{" "}
                {props.originCity ? props.originCity : props.originAirport}{" "}
              </p>
              <p>
                <FaPlaneArrival />{" "}
                {props.destinationCity
                  ? props.destinationCity
                  : props.destinationAirport}{" "}
              </p>
            </div>

            {/* Tipo de vuelo */}
            <div className={styles.offersCardType}>
              {props.transfersD.length === 1 ? (
                <p>
                  <IoMdAirplane /> Vuelo directo
                </p>
              ) : (
                <p>
                  <BsArrowLeftRight /> Tiene {props.transfersD.length - 1}{" "}
                  escalas
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className={styles.offersCardButtons}>
              <button
                onClick={(e) => {
                  handleClick(e);
                }}
              >
                <AiOutlineExclamationCircle />
                {clicked[1]}
              </button>
              <button onClick={handleFavs}>Añadir a favs</button>
              <Link
                to={{
                  pathname: `/ticket/${props.offers}`,
                  state: {
                    ...props,
                  },
                }}
                className={styles.offersCardButtonsPrice}
              >
                {`${props.currency} ${props.price}`}
              </Link>
            </div>
          </div>

          <div className={styles.offersCardDetail}>
            {clicked[0] ? (
              <>
                <h3>Detalles del Vuelo</h3>
                {props.transfersD.length > 1 ? (
                  <h4>Escalas de ida</h4>
                ) : (
                  <h4>Vuelo directo</h4>
                )}
              </>
            ) : (
              false
            )}
            {clicked[0]
              ? props.transfersD.map((escala,index) => (
                  <div className={styles.offersCardTransfers} key={index}>
                    <div>
                      <p>
                        {" "}
                        <FaPlaneDeparture />{" "}
                        <span className={styles.sp}>{escala.origin}</span>{" "}
                      </p>
                      <p>
                        {" "}
                        <FaPlaneArrival />{" "}
                        <span className={styles.sp}>
                          {escala.destination}
                        </span>{" "}
                      </p>
                    </div>
                    <div>
                      <p>
                        {" "}
                        <BsCalendarDateFill /> <span>Salida:</span>{" "}
                        {escala.departure.slice(0, 10)}{" "}
                        {escala.departure.slice(11, 19)}{" "}
                      </p>
                      <p>
                        {" "}
                        <BsCalendarDate /> <span>Llegada:</span>{" "}
                        {escala.arrive.slice(0, 10)}{" "}
                        {escala.arrive.slice(11, 19)}
                      </p>
                    </div>
                    <div>
                      <p>
                        {" "}
                        <GiCommercialAirplane />
                        <span>Aerolinea:</span> {escala.airline}
                      </p>
                      <p>
                        {" "}
                        <AiOutlineFieldNumber /> <span>Vuelo Nro:</span>{" "}
                        {escala.flightNumber}{" "}
                      </p>
                    </div>
                  </div>
                ))
              : false}

            <div className={styles.offersCardDetail}>
              {clicked[0] ? (
                <>
                  {props.transfersR.length > 1 ? (
                    <h4>Escalas de vuelta</h4>
                  ) : (
                    <h4>Vuelo directo</h4>
                  )}
                </>
              ) : (
                false
              )}
              {clicked[0]
                ? props.transfersR.map((escala,index) => (
                    <div className={styles.offersCardTransfers} key={index}>
                      <div>
                        <p>
                          {" "}
                          <FaPlaneDeparture />{" "}
                          <span className={styles.sp}>
                            {escala.origin}
                          </span>{" "}
                        </p>
                        <p>
                          {" "}
                          <FaPlaneArrival />{" "}
                          <span className={styles.sp}>
                            {escala.destination}
                          </span>{" "}
                        </p>
                      </div>
                      <div>
                        <p>
                          {" "}
                          <BsCalendarDateFill /> <span>Salida:</span>{" "}
                          {escala.departure.slice(0, 10)}{" "}
                          {escala.departure.slice(11, 19)}{" "}
                        </p>
                        <p>
                          {" "}
                          <BsCalendarDate /> <span>Llegada:</span>
                          {escala.arrive.slice(0, 10)}{" "}
                          {escala.arrive.slice(11, 19)}{" "}
                        </p>
                      </div>
                      <div>
                        <p>
                          {" "}
                          <GiCommercialAirplane /> <span>Aerolinea:</span>{" "}
                          {escala.airline}{" "}
                        </p>
                        <p>
                          {" "}
                          <AiOutlineFieldNumber /> <span>Vuelo Nro:</span>{" "}
                          {escala.flightNumber}{" "}
                        </p>
                      </div>
                    </div>
                  ))
                : false}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
