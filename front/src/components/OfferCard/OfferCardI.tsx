import React, { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import styles from "./OfferCard.module.scss";

export default function OfferCardI(props: any): JSX.Element {
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
          <button onClick={(e) => {handleClick(e);}}> <AiOutlineExclamationCircle size={20}/> </button>
          </h2>
          <p className={styles.cardPrice}> {`${props.currency} ${props.price}`} </p>
      </div>

      {clicked
        ? props.transfers.map((escala: any) => (
            <div className={styles.cardTransfers}>
              <p> {escala.origin} - {escala.destination} </p>
              <p>Salida: {escala.departure} - Llegada: {escala.arrive}</p>
              <p> Aerolinea: {escala.airline}</p>
            </div>
          ))
        : false}


    </div>
  );
}
