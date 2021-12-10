import Navbar from "../../components/Navbar/Navbar";
import styles from "./OfferDetail.module.scss";
import { useEffect } from "react";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import OfferDetailInfo from "../../components/OfferDetailInfo/OfferDetailInfo";
import OfferCardI from "../../components/OfferCard/OfferCardI";
import { IoIosAirplane } from "react-icons/io";

export default function OfferDetail() {
  const { state } = useLocation();
  const { offerId } = useParams();
  const history = useHistory();

  console.log("OfferDetail: ", state.offerProps);

  const dataFromQuery = {};

  const getQueryData = (offerQuery) => {
    return offerQuery
      .split("&")
      .map((word) => word.replace("=", ",").replace("?", "").split(","))
      .forEach((el) => (dataFromQuery[el[0]] = el[1]));
  };
  getQueryData(state.offerProps.query);

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <main className={styles.offerDetail}>
      <Navbar />

      {/* Container */}
      <div className={styles.offerDetailContent}>
        <img src={logo} alt="Dev-Sky" />
        {/* Detail */}
        <section className={styles.offerDetailExtense}>
          <OfferDetailInfo {...state.offerProps} />
        </section>

        {/* Buttons */}
        <div className={styles.offerDetailButtons} >
          <button
            className={styles.offerDetailBackButton}
            onClick={history.goBack}
          >
            <IoIosAirplane /> Ver más
          </button>
          <Link
            to={{
              pathname: `/ticket/${offerId}`,
              state: {
                offerProps: {
                  ...state.offerProps,
                },
              },
            }}
            className={styles.offerDetailButton}
          >
            Comprar
          </Link>
        </div>

        {/* Recomendations */}
        <aside className={styles.offerDetailRecomendations}>
          <h2>Ofertas similares disponibles</h2>
          <OfferCardI {...state.offerProps} />
          <OfferCardI {...state.offerProps} />
        </aside>
      </div>
    </main>
  );
}
