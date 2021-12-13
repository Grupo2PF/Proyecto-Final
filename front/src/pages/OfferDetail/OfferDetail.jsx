import Navbar from "../../components/Navbar/Navbar";
import styles from "./OfferDetail.module.scss";
import { useEffect } from "react";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { Link, useHistory, useLocation } from "react-router-dom";
import OfferDetailInfo from "../../components/OfferDetailInfo/OfferDetailInfo";
import { IoIosAirplane } from "react-icons/io";
import RecomendationCardIda from "../../components/RecomendationCard/RecomendationCardIda";
import RecomendationCardIdaVuelta from "../../components/RecomendationCard/RecomendationCardIdaVuelta";

export default function OfferDetail() {
  const { state } = useLocation();
  const history = useHistory();

  console.log("OfferDetail: ", state);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <main className={styles.offerDetail}>
      <Navbar />

      {/* Container */}
      <div className={styles.offerDetailContent}>
        <img src={logo} alt="Dev-Sky" />
        {/* Detail */}
        <section className={styles.offerDetailExtense}>
          <OfferDetailInfo {...state} />
        </section>

        {/* Buttons */}
        <div className={styles.offerDetailButtons}>
          <button
            className={styles.offerDetailBackButton}
            onClick={history.goBack}
          >
            <IoIosAirplane /> Ver más ofertas
          </button>
          <Link
            to={{
              pathname: `/ticket/${state.offers}`,
              state: {
                ...state,
              },
            }}
            className={styles.offerDetailButton}
          >
            Comprar
          </Link>
        </div>

        {/* Recomendations */}
        {state.recomendations && state.recomendations.length > 0 ? (
          <aside className={styles.offerDetailRecomendations}>
            <h2>Ofertas similares disponibles</h2>
            {state.mode === "oneway" ? (
              <>
                {state.recomendations.map((offer, index) => {
                  if (offer.offers !== state.offers) {
                    return <RecomendationCardIda key={index} {...offer} />;
                  } else return null;
                })}
              </>
            ) : (
              <>
                {state.recomendations.map((offer, index) => {
                  if (offer.offers !== state.offers) {
                    return (
                      <RecomendationCardIdaVuelta key={index} {...offer} />
                    );
                  } else return null;
                })}
              </>
            )}
          </aside>
        ) : (
          <></>
        )}
      </div>
    </main>
  );
}
