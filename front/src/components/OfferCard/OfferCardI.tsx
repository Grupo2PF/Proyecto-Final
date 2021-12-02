import React, { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import styles from "./OfferCard.module.scss";
import {useDispatch} from "react-redux";
import { getSeats} from "../../redux/actions/";

export default function OfferCardI(props: any): JSX.Element {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch()

  const handleClick = (e: any) => {
    if (!clicked) {
      return setClicked(true);
    } else {
      return setClicked(false);
    }
  };

  const handleBuy = (e: any) => {
    const id= props.offers
    dispatch(getSeats(id));
  }
  
  

  return (
    <div className={styles.cardContainer}>

      <div className={styles.cardInfo}>
          <h2>
          {props.originCity ? props.originCity : props.originAirport} -
          {props.destinationCity ? props.destinationCity : props.destinationAirport}
          <button onClick={(e) => {handleClick(e);}}> <AiOutlineExclamationCircle size={20}/> </button>
          </h2>
          <button onClick={handleBuy} className={styles.cardPrice}>{`${props.currency} ${props.price}`} </button>
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
