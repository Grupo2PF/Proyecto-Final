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
import Maps from "../../components/map/map";
import notFound from "../../assets/notFound.jpg";

export default function OfferPage(): JSX.Element {
  const response: any = useSelector((state: any) => state.allFlight);
  // const cargando: any = useSelector((state: any) => state.loading);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getFlightUrl(location.search));
  }, [dispatch, location.search]);

  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch, location]);

  const render = () => {
    const recomendations: any = [];
    if (response.offers?.length >= 4) {
      for (let i = 0; i < 3; i++) {
        recomendations.push(response.offers[i]);
      }
    }

    if (response.mode) {
      return (
        <section className={styles.divContainer}>
          <Navbar />
          <header className={styles.heroBanner} data-aos="fade-right" data-aos-duration="1200">
            <h1 data-aos="fade-up" data-aos-duration="1200" data-aos-delay="250">
              Las mejores ofertas en vuelos desde{" "}
              {response.origin.city
                ? response.origin.city
                : response.origin.airport}{" "}
              hacia{" "}
              {response.destination.city
                ? response.destination.city
                : response.destination.airport}
            </h1>
          </header>
          <Maps />

          <h2 data-aos="fade-up">Ofertas disponibles</h2>

          <section className={styles.offersCards}>
            {response.mode === "oneway"
              ? response.offers.map((item: any) => (
                  <OfferCardI
                    key={item.id}
                    offers={item.id}
                    currency={item.currency}
                    price={item.price}
                    transfers={item.transfers}
                    mode={response.mode}
                    originCity={response.origin.city}
                    destinationCity={response.destination.city}
                    originAirport={response.origin.airport}
                    destinationAirport={response.destination.airport}
                    recomendations={recomendations}
                  />
                ))
              : response.offers.map((item: any) => (
                  <OfferCardIV
                  
                    key={item.id}
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
                    recomendations={recomendations}
                  />
                ))}
          </section>
        </section>
      );
    } else {
      return (
        <div>
          <Navbar />
          <img className={styles.imagen} src={notFound} alt="error"></img>
        </div>
      );
    }
  };

  const loading = () => {
    return <LoadingScreen />;
  };

  return <div>{response ? render() : loading()}</div>;
}
