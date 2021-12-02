import React, { useState } from "react";
import styles from "./OfferCard.module.scss";
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function OfferCardIV(props: any): JSX.Element {
  const [clicked, setClicked] = useState(false);

  const handleClick = (e: any) => {
    if (!clicked) {
      return setClicked(true);
    } else {
      return setClicked(false);
    }
  };

  return (
    <div className={styles.cardContainer}>

        <div className={styles.cardInfo}>

            <h2>
                {props.originCity ? props.originCity : props.originAirport} -
                {props.destinationCity ? props.destinationCity : props.destinationAirport}
                <button onClick={(e) => { handleClick(e) }}> <AiOutlineExclamationCircle size={20}/> </button>
            </h2>
            <div className={styles.cardPrice}> {`${props.currency} ${props.price}`} </div>
        </div>


        {clicked
          ? props.transfersD.map((escala: any) => (
              <div className={styles.cardTransfers}>
                  <h2> Escalas IDA </h2>
                <div>
                  {escala.origin} - {escala.destination}
                </div>
                <p>Salida: {escala.departure}</p>
                <p>Llegada: {escala.arrive}</p>
                <p>Aerolinea: {escala.airline}</p>
                <p>Vuelo Nro: {escala.flightNumber}</p>
              </div>
            ))
          : false}


        {clicked
          ? props.transfersR.map((escala: any) => (
              <div className={styles.cardTransfers}>
                  <h2> Escalas VUELTA </h2>
                <div>
                  {escala.origin} - {escala.destination}
                </div>
                <p>Salida: {escala.departure}</p>
                <p>Llegada: {escala.arrive}</p>
                <p>Aerolinea: {escala.airline}</p>
                <p>Vuelo Nro: {escala.flightNumber}</p>
              </div>
            ))
          : false}


    </div>
  )
}
