import React, { useState } from "react";
import styles from "./OfferCard.module.scss";
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
import { getSeats } from "../../redux/actions/";

export default function OfferCardIV(props: any): JSX.Element {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (e: any) => {
    if (!clicked) {
      return setClicked(true);
    } else {
      return setClicked(false);
    }
  };

  const handleBuy = (e: any) => {
    const id = props.offers;
    dispatch(getSeats(id));
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
                  <BsArrowLeftRight /> Tiene {props.transfersD.length-1} escalas
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
                Ver detalles
              </button>
              <button
                className={styles.offersCardButtonsPrice}
                onClick={handleBuy}
              >
                {`${props.currency} ${props.price}`}
              </button>
            </div>
          </div>

          <div className={styles.offersCardDetail}>
            {clicked ? (
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
            {clicked
              ? props.transfersD.map((escala: any) => (
                  <div className={styles.offersCardTransfers}>
                    <div>
                      <p> <FaPlaneDeparture /> <span className={styles.sp}>{escala.origin}</span> </p>
                      <p> <FaPlaneArrival /> <span className={styles.sp}>{escala.destination}</span> </p>
                    </div>
                    <div>
                      <p> <BsCalendarDateFill /> <span>Salida:</span> {escala.departure.slice(0,10)}{" "}{escala.departure.slice(11,19)} </p>
                      <p> <BsCalendarDate /> <span>Llegada:</span> {escala.arrive.slice(0,10)}{" "}{escala.arrive.slice(11,19)}</p>
                    </div>
                    <div>
                      <p> <GiCommercialAirplane /><span>Aerolinea:</span> {escala.airline}</p>
                      <p> <AiOutlineFieldNumber /> <span>Vuelo Nro:</span> {escala.flightNumber} </p>
                    </div>
                  </div>
                ))
              :false}

            <div className={styles.offersCardDetail}>
              {clicked ? (
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
              {clicked
                ? props.transfersR.map((escala: any) => (
                    <div className={styles.offersCardTransfers}>
                      <div>
                        <p> <FaPlaneDeparture /> <span className={styles.sp}>{escala.origin}</span> </p>
                        <p> <FaPlaneArrival /> <span className={styles.sp}>{escala.destination}</span> </p>
                      </div>
                      <div>
                        <p> <BsCalendarDateFill /> <span>Salida:</span> {escala.departure.slice(0,10)}{" "}{escala.departure.slice(11,19)} </p>
                        <p> <BsCalendarDate /> <span>Llegada:</span>{escala.arrive.slice(0,10)}{" "}{escala.arrive.slice(11,19)} </p>
                      </div>
                      <div>
                        <p> <GiCommercialAirplane /> <span>Aerolinea:</span> {escala.airline} </p>
                        <p> <AiOutlineFieldNumber /> <span>Vuelo Nro:</span> {escala.flightNumber} </p>
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
