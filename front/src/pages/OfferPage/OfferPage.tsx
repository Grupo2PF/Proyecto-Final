import styles from "./OfferPage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import OfferCardI from "../../components/OfferCard/OfferCardI";
import OfferCardIV from "../../components/OfferCard/OfferCardIV";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import Navbar from "../../components/Navbar/Navbar";
import { getFlightUrl, resetState } from "../../redux/actions";
// import HeroBanner from "../../components/HeroBanner/HeroBanner";
import Maps from "../../components/map/map";
import notFound from "../../assets/notFound.jpg";

export default function OfferPage(): JSX.Element {
  const response: any = useSelector((state: any) => state.allFlight);
  const [ordenado, setOrdenado] = useState(response);
  // const cargando: any = useSelector((state: any) => state.loading);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(getFlightUrl(location.search));
  }, [dispatch, location.search]);

  // useEffect(() => {
  //   setOrdenado(response);
  // },[])

  useEffect(() => {
    render();
  }, [ordenado.mode])


  useEffect(() => {
    return () => {
      dispatch(resetState());
    };
  }, [dispatch, location]);


  const handleSort = (e: any) => {
    e.preventDefault();
    const sort = response;
    if (e.target.value === "masbarato") {
    sort.offers.sort((a: any, b: any) => {
      if(a.price>b.price){
        return 1;
      }
      setOrdenado(sort);
      if(a.price<b.price){
        return -1;
      }
      setOrdenado(sort);
      return 0;
    });
  } if (e.target.value === "mascaro") {
    sort.offers.sort((a: any, b: any) => {
      if(a.price>b.price){
        return -1;
      }
      setOrdenado(sort);
      if(a.price<b.price){
        return 1;
      }
      setOrdenado(sort);
      return 0;
    });
  }
  setOrdenado(sort);
};

  const render = () => {
    const recomendations: any = [];
    if (ordenado?.offers.length >= 4) {
      for (let i = 0; i < 3; i++) {
        recomendations.push(ordenado?.offers[i]);
      }
    }

    if (response.mode) {
      return (
        <section className={styles.divContainer}>
          <Navbar />
          <header className={styles.heroBanner} data-aos="fade-right" data-aos-duration="1200">
            <h1 data-aos="fade-up" data-aos-duration="1200" data-aos-delay="250">
              Las mejores ofertas en vuelos desde{" "}
              {ordenado?.origin.city
                ? ordenado?.origin.city
                : ordenado?.origin.airport}{" "}
              hacia{" "}
              {ordenado?.destination.city
                ? ordenado?.destination.city
                : ordenado?.destination.airport}
            </h1>
          </header>
          <Maps />

          <h2 data-aos="fade-up">Ofertas disponibles</h2>

          <section className={styles.offersCards}>
            <p>Ordenar por:</p>
            <select onChange={handleSort}>
              <option value="nada">nada</option>
              <option value="mascaro">Mayor precio</option>
              <option value="masbarato">Menor precio</option>
            </select>
            {ordenado?.mode === "oneway"
              ? ordenado?.offers.map((item: any) => (
                  <OfferCardI
                    key={item.id}
                    offers={item.id}
                    currency={item.currency}
                    price={item.price}
                    transfers={item.transfers}
                    mode={ordenado?.mode}
                    originCity={ordenado?.origin.city}
                    destinationCity={ordenado?.destination.city}
                    originAirport={ordenado?.origin.airport}
                    destinationAirport={ordenado?.destination.airport}
                    recomendations={recomendations}
                  />
                ))
              : ordenado?.offers.map((item: any) => (
                  <OfferCardIV
                  
                    key={item.id}
                    offers={item.id}
                    currency={item.currency}
                    price={item.price}
                    transfersD={item.departure.transfers}
                    transfersR={item.return.transfers}
                    mode={ordenado?.mode}
                    originCity={ordenado?.origin.city}
                    destinationCity={ordenado?.destination.city}
                    originAirport={ordenado?.origin.airport}
                    destinationAirport={ordenado?.destination.airport}
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
