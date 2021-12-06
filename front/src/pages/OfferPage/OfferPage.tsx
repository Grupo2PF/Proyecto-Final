import styles from "./OfferPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import OfferCardI from "../../components/OfferCard/OfferCardI";
import OfferCardIV from "../../components/OfferCard/OfferCardIV";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Navbar from "../../components/Navbar/Navbar";
import { getFlightUrl, resetState } from "../../redux/actions";
// import HeroBanner from "../../components/HeroBanner/HeroBanner";
import Maps from "../../components/map/map"

export default function OfferPage(): JSX.Element {
  const response: any = useSelector((state: any) => state.allFlight);
  const cargando: any = useSelector((state: any) => state.loading);
  const dispatch = useDispatch();
  const location = useLocation();


  useEffect(() => {
    setTimeout(() => {
      if (cargando) {
        <LoadingScreen />;
      } else {
        dispatch(getFlightUrl(location.search));
      }
    }, 3000);
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [location]);

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
          <Maps/>

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
    }else {
      return <div><p>No hay vuelos</p></div>;
    }
  };

  const loading = () => {
    return <LoadingScreen />;
  };

  return <div>{response? render() : loading()}</div>;
}
