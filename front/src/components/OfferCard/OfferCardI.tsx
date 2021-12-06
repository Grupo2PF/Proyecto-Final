import React, { useState } from "react";
import styles from "./OfferCard.module.scss";
import { useDispatch } from "react-redux";
import { AiOutlineExclamationCircle, AiOutlineFieldNumber  } from "react-icons/ai";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { BsArrowLeftRight, BsCalendarDateFill, BsCalendarDate } from "react-icons/bs";
import { IoMdAirplane } from "react-icons/io";
import { GiCommercialAirplane } from "react-icons/gi";
import { getSeats } from "../../redux/actions/";


export default function OfferCardI(props: any): JSX.Element {
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
              {props.transfers.length === 1 ? <p> <IoMdAirplane/> Vuelo directo </p> : <p> <BsArrowLeftRight /> Tiene {props.transfers.length} escalas</p> }
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
            {clicked ? 
            <>
            <h3>Detalles del Vuelo</h3>
            {props.transfers.length > 1 ? <h4>Escalas de Ida</h4> : <h4>Vuelo directo</h4> }
            </>
            : false}
            {clicked
              ? props.transfers.map((escala: any) => (
                <div className={styles.offersCardTransfers}>
                  <div>
                    <p> <FaPlaneDeparture /> {escala.origin} </p>
                    <p> <FaPlaneArrival /> {escala.destination} </p>
                  </div>
                  <div>
                    <p>  <BsCalendarDateFill/> Salida: {escala.departure} </p>
                    <p> <BsCalendarDate/> Llegada: {escala.arrive} </p>
                  </div>
                  <div>
                    <p> <GiCommercialAirplane />Aerolinea: {escala.airline}</p>
                    <p> <AiOutlineFieldNumber/>Vuelo Nro: {escala.flightNumber}</p>
                  </div>
                  </div>
                ))
                : false}
          </div>

          </div>
      </section>
    </>
  );

  // return (
  //   <div className={styles.cardContainer}>

  //     <div className={styles.cardInfo}>
  //         <h2>
  //         {props.originCity ? props.originCity : props.originAirport} -
  //         {props.destinationCity ? props.destinationCity : props.destinationAirport}
  //         </h2>
  //         <div className={styles.cardNumTransfers}>
  //           Tiene {props.transfers.length} Escalas
  //         <button onClick={(e) => {handleClick(e);}}> <AiOutlineExclamationCircle size={23}/> </button>
  //         </div>
  //         <div className={styles.cardPrice}>
  //         <button onClick={handleBuy} >{`${props.currency} ${props.price}`} </button>
  //         </div>
  //     </div>

  //     {clicked
  // ? props.transfers.map((escala: any) => (
  //           <div className={styles.cardTransfers}>
  //             <p> {escala.origin} - {escala.destination} </p>
  //             <p> Salida: {escala.departure} - Llegada: {escala.arrive}</p>
  //             <p> Aerolinea: {escala.airline}</p>
  //           </div>
  //         ))
  //       : false}

  //   </div>
  // );
}
