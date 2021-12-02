import styles from "./OfferPage.module.scss";
import { useSelector } from "react-redux";
import OfferCardI from "../../components/OfferCard/OfferCardI";
import OfferCardIV from "../../components/OfferCard/OfferCardIV";

export default function OfferPage(): JSX.Element {

  const response: any = useSelector((state: any) => state.allFlight);

  
  return (
    <section className={styles.divContainer}>
      <header>
        <h2> {response.origin.airport ? response.origin.airport : response.origin.city } - {response.destination.airport ? response.destination.airport : response.destination.city } </h2>
      </header>

      {response.mode === "oneway" ?
        response.offers.map((item: any) => (
          <OfferCardI
            offers={item.id}
            currency={item.currency}
            price={item.price}
            transfers={item.transfers}
            mode={response.mode}
            originCity={response.origin.city}
            destinationCity={response.destination.city}
            originAirport={response.origin.airport}
            destinationAirport={response.destination.airport}
          />))
          : 
        response.offers.map((item: any) => (
          <OfferCardIV
            offers={item.id}
            currency={item.currency}
            price={item.price}
            transfersD={item.departure.transfers}
            transfersR={item.return.transfers}
            mode={response.mode}
            originCity={response.origin.city}
            destinationCity={response.destination.city}
            originAirport={response.origin.airport}
            destinationAirport={response.destination.airport}
          />))
        }

    </section>
   )
}
