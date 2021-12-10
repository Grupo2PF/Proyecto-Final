import React, { useState } from "react";
import styles from "./OfferCard.module.scss";
import { useDispatch } from "react-redux";
import { AiOutlineExclamationCircle, AiOutlineFieldNumber  } from "react-icons/ai";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { BsArrowLeftRight, BsCalendarDateFill, BsCalendarDate } from "react-icons/bs";
import { IoMdAirplane } from "react-icons/io";
import { GiCommercialAirplane } from "react-icons/gi";
import { getSeats, sendFavs } from "../../redux/actions/";
import {auth} from "../../firebaseConfig";


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

  const handleFavs = (e: any) => {
    if(auth.currentUser){
    const info = {
      id: props.offers,
      userId: auth.currentUser.uid,
      mode: props.mode,
      origin: props.originCity,
      destination: props.destinationCity,
      originAirport: props.originAirport,
      destinationAirport: props.destinationAirport,
      escalas:props.transfers.length -1,
      transfers: props.transfers.length -1,
      price: `${props.currency} ${props.price}`,
    }
    dispatch(sendFavs(info));
    }else{
      alert("Debes iniciar sesión para poder agregar a favoritos")
    }

  }

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
              {props.transfers.length === 1 ? <p> <IoMdAirplane/> Vuelo directo </p> : <p> <BsArrowLeftRight /> Tiene {props.transfers.length-1} escalas</p> }
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

              <button onClick={handleFavs}>añadir a favs</button>

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
                    <p> <FaPlaneDeparture /> <span className={styles.sp} >{escala.origin}</span> </p>
                    <p> <FaPlaneArrival /> <span className={styles.sp} >{escala.destination}</span> </p>
                  </div>
                  <div>
                    <p>  <BsCalendarDateFill/> <span> Salida: </span> {escala.departure.slice(0, 10)}{" "}{escala.departure.slice(11, 19)} </p>
                    <p> <BsCalendarDate/> <span>Llegada:</span> {escala.arrive.slice(0, 10)}{" "}{escala.arrive.slice(11, 19)} </p>
                  </div>
                  <div>
                    <p> <GiCommercialAirplane /> <span>Aerolinea:</span> {escala.airline}</p>
                    <p> <AiOutlineFieldNumber/><span>Vuelo Nro:</span> {escala.flightNumber}</p>
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
