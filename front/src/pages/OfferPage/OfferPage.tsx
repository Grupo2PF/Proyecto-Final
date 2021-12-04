import styles from "./OfferPage.module.scss";
import { useSelector } from "react-redux";
import OfferCardI from "../../components/OfferCard/OfferCardI";
import OfferCardIV from "../../components/OfferCard/OfferCardIV";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Navbar from "../../components/Navbar/Navbar";
// import HeroBanner from "../../components/HeroBanner/HeroBanner";

export default function OfferPage(): JSX.Element {
  const response: any = useSelector((state: any) => state.allFlight);
  const cargando: any = useSelector((state: any) => state.loading);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      if (cargando) {
        <LoadingScreen />;
      } else {
        history.push("/");
      }
    }, 3000);
  }, []);

  const render = () => {
    if (response.mode) {
      return (
        <section className={styles.divContainer}>
          <Navbar />
          <header className={styles.heroBanner}>
            <h1>
              Las mejores ofertas en vuelos desde{" "}
              {response.origin.city ? response.origin.city : response.origin.airport}{" "}
              hacia{" "}
              {response.destination.city ? response.destination.city : response.destination.airport}
            </h1>
          </header>

          <h2>Ofertas disponibles</h2>

          <section className={styles.offersCards}>
            {response.mode === "oneway"
              ? response.offers.map((item: any) => (
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
                  />
                ))
              : response.offers.map((item: any) => (
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
                  />
                ))}
          </section>
        </section>
      );
    }
  };

  const loading = () => {
    return <LoadingScreen />;
  };

  return <div>{response.mode ? render() : loading()}</div>;
}
