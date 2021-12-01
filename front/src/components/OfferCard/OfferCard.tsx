import React, { useState } from "react";
import { Back } from "../../pages/OfferPage/OfferPage";
import styles from "./OfferCard.module.scss"

export default function OfferCard(props: any): JSX.Element {
  const [clicked, setClicked] = useState(false);

  let modo: string = "";
  // var oneWay: JSX.Element = <></>;
  // var idaVuelta: JSX.Element = <></>;


  const handleClick = (index: any) => {
    if (clicked === index) {
      return setClicked(true);
    }
  };
  //   if (props.mode === "oneway") {
  //     modo = "Solo Ida";

  // console.log(props)
  console.log('viendo props.item')
  console.log(props.offers)

  return (

    <div className={styles.idaVueltaContainer}>

      {props.offers ?
        <div>
          {props.mode === "oneway" ?/*  <h2>aca va el oneway</h2> */
            <div className={styles.cardContainer}>

              <div className={styles.cardPrice}> {`${props.currency} ${props.price}`} </div>

              <div className={styles.cardInfo} >
                <p> {modo} </p>
                <h2>
                  {props.originCity ? props.originCity : props.originAirport} - {props.destinationCity ? props.destinationCity : props.destinationAirport}
                </h2>

                {/* {props.offers.transfers.length === 1 ? (<p> Vuelo directo </p>) : (<p> Tiene Escalas </p>)} */}

              </div>




              {props.transfers ? props.transfers.map((escala: any) => (
                <div className={styles.cardTransfers}>
                  <p> {escala.origin} - {escala.destination} </p>
                  <p> {escala.departure} - {escala.arrive} </p>
                  <p> Aerolinea: {escala.airline}</p>
                </div>
              )) : <h2>No renderiza las transfers</h2>}


            </div>
            :
            <h2>Aca va el ioda y vuelta</h2>
            /*<div>

              <div>
                <p> {`${props.item.currency} ${props.item.price}`}</p>

                <h2>Escalas/transbordos IDA</h2>
                {props.item.departure.transfers.map((item: any) => (
                  <div>
                    <p>
                      {props.originCity ? props.originCity : props.originAirport} - {props.destinationCity ? props.destinationCity : props.destinationAirport}
                    </p>

                    <p>Salida: {item.departure}</p>
                    <p>Llegada: {item.arrive}</p>
                    <p>Aerolinea: {item.airline}</p>
                    <p>Vuelo Nro: {item.flightNumber}</p>

                  </div>
                ))}
              </div>

              <h2>Escalas/transbordos VUELTA</h2>
              {props.item.return.transfers.map((item: any) => (
                <div>
                  <p>
                    {item.origin} - {item.destination}
                  </p>
                  <p>Salida: {item.departure}</p>
                  <p>Llegada: {item.arrive}</p>
                  <p>Aerolinea: {item.airline}</p>
                  <p>Vuelo Nro: {item.flightNumber}</p>
                  <br />
                </div>
              ))}
            </div>*/

          }






        </div> : <h2>No renderiza ninguno de los dos </h2>}





    </div>
  )

}
