import styles from "./OfferPage.module.scss";
// import info from "./OfferJson";
import { useSelector } from "react-redux";
// import { useState } from "react";
import OfferCard from "../../components/OfferCard/OfferCard";
import { RiH2 } from "react-icons/ri";
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

        {response ? <h2>{response.origin.airport} </h2> : <h2>Nada de nada </h2>}


        {response
          ? <h2>{response.destination.airport}</h2>
          : <h2>Nada de nada </h2>}

      </header>
      <h3>Holaaso?</h3>
      {response ?
        response.offers.map((item: any) => (
          <OfferCard
            offers={item.id}
            currency={item.currency}
            price={item.price}
            transfers={item.transfers}
            mode={response.mode}
            originCity={response.origin.city}
            destinationCity={response.destination.city}
            originAirport={response.origin.airport}
            destinationAirport={response.destination.airport}
          />
        ))

        : <h2>No detecta el response</h2>}
    </section>
  );
}
