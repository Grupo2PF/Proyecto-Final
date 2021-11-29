import styles from "./OfferPage.module.scss";
import info from "./OfferJson";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

type transfers = {
  id?: string;
  origin: string;
  destination: string;
  departure: string;
  arrive: string;
  airline: string;
  flightNumber: string;
};

type offer = {
  id: string;
  price: string;
  currency: string;
  airline: string;
  departure: {
    id: string;
    origin: {
      city: string;
      airport: string;
      date: string;
    };
    destiny: {
      city: string;
      airport: string;
    };
    transfers: Array<transfers>;
  };
  return?: {
    id: string;
    origin: {
      city: string;
      airport: string;
      date: string;
    };
    destiny: {
      city: string;
      airport: string;
    };
    transfers: Array<transfers>;
  };
};

type Back = {
  mode: string;
  class: string;
  origin: {
    city: string;
    airport: string;
  };
  destination: {
    city: string;
    airport: string;
  };
  offers: Array<offer>;
};

export default function OfferPage(): JSX.Element {
  const dispatch = useDispatch();

  const response: any = useSelector((state: any) => state.allFlight);
  console.log(" soy el response del useSelector ");
  console.log(response);
  let modo: string = "";
  var oneWay: JSX.Element = <></>;
  var idaVuelta: JSX.Element = <></>;

  if (response.mode === "oneway") {
    modo = "Solo Ida";
    var oneWay: JSX.Element = (
      <div>
        
        {response.offers.map((item: any) => (
          <div>
            <div>
              <p> {`${item.currency} ${item.price}`}</p>
              <h2>Escalas/transbordos</h2>
              {item.transfers.map((item: any) => (
                <div>
                  <p>
                    {item.origin} - {item.destination}
                  </p>
                  <p>Salida: {item.departure}</p>
                  <p>Llegada: {item.arrive}</p>
                  <p>Aerolinea: {item.airline}</p>
                  Vuelo Nro: {item.flightNumber}
                  <br />
                </div>
              ))}
              <br />
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    modo = "Ida y Vuelta";
    var idaVuelta: JSX.Element = (
      <div>
        
        {response.offers.map((item: any) => (
          <div>
            <div>
              <p> {`${item.currency} ${item.price}`}</p>
              <h2>Escalas/transbordos IDA</h2>
              {item.departure.transfers.map((item: any) => (
                <div>
                  <p>
                    {item.origin} - {item.destination}
                  </p>
                  <p>Salida: {item.departure}</p>
                  <p>Llegada: {item.arrive}</p>
                  <p>Aerolinea: {item.airline}</p>
                  <p>Vuelo Nro: {item.flightNumber}</p>
                  <br/>
                </div>
              ))}
            </div>
            <h2>Escalas/transbordos VUELTA</h2>
            {item.return.transfers.map((item: any) => (
              <div>
                <p>
                  {item.origin} - {item.destination}
                </p>
                <p>Salida: {item.departure}</p>
                  <p>Llegada: {item.arrive}</p>
                  <p>Aerolinea: {item.airline}</p>
                  <p>Vuelo Nro: {item.flightNumber}</p>
                <br/>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <div>
        {/* <h1>
          {`${response.offers[0].transfers[0].origin}, destino ${response.destination.city} y clase ${response.class}`}
        </h1> */}
        <p>{modo}</p>
        <p>{response.origin.airport}</p>
        <p>{response.destination.airport}</p>
      </div>

      <div>{response.mode === "oneway" ? <div>{oneWay} </div>:<div> {idaVuelta} </div>}</div>
    </div>
  );
}
