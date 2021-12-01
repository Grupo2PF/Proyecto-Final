import styles from "./OfferPage.module.scss";
// import info from "./OfferJson";
import { useSelector } from "react-redux";
// import { useState } from "react";
import OfferCard from "../../components/OfferCard/OfferCard";
// import { useEffect } from "react";

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

export type Back = {
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
  // const dispatch = useDispatch();

  const response: any = useSelector((state: any) => state.allFlight);

  console.log(" soy el response del useSelector ");
  console.log(response);

  return (
    <section className={styles.divContainer}>
      <header>
        <h2>
          {response.origin.airport ? response.origin.airport : "Origen"}{" "}
        </h2>
        <h2>
          {response.destination.airport
            ? response.destination.airport
            : "Destino"}{" "}
        </h2>
      </header>

      {/* {response.offers.length ?  */}
      {response.offers.map((item: any) => (
        <OfferCard
          offers={item}
          mode={response.mode}
          originCity={response.origin.city}
          destinationCity={response.destination.city}
          originAirport={response.origin.airport}
          destinationAirport={response.destination.airport}
        />
      ))}
      {/* :false } */}
    </section>
  );
}
