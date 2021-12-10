import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";
import styles from "./TicketPage.module.scss";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import PassengerForm from "../../components/PassengerForm/PassengerForm";
import BasicTicketinfo from "../../components/BasicTicketInfo/BasicTicketinfo";
import { useEffect } from "react";
export default function TicketPage() {
  const { state } = useLocation();
  const { offerId } = useParams();
  const history = useHistory();
  // console.log("State desde Ticket form: ", state);
  // console.log("Props de la oferta desde Ticket form: ", state.offerProps);
  // console.log("ID desde Ticket form: ", offerId);

  console.log("ESTADO: ", state);

  const dataFromQuery = {};

  const getQueryData = (offerQuery) => {
    return offerQuery
      .split("&")
      .map((word) => word.replace("=", ",").replace("?", "").split(","))
      .forEach((el) => (dataFromQuery[el[0]] = el[1]));
  };
  getQueryData(state.offerProps.query);

  const totalPassengers =
    parseInt(dataFromQuery.adults) + parseInt(dataFromQuery.childs);

  const insertForms = (passengers) => {
    const forms = [];
    for (let i = 1; i < passengers + 1; i++) {
      forms.push(
        <PassengerForm totalPassengers={passengers} passenger={i} key={i} />
      );
    }
    return forms;
  };

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <main className={styles.ticketPage}>
      <GoHomeButton />
      <section className={styles.ticketPageContent}>
        <header className={styles.ticketPageHeader}>
          <img src={logo} alt="DevSky" />
          <h1>
            {totalPassengers === 1
              ? `Confirme los datos del pasajero`
              : `Confirme los datos de los pasajeros`}
          </h1>
        </header>

        {/* Forms */}
        <div className={styles.ticketPageForms}>
          {insertForms(totalPassengers)}
        </div>

        {/* Info */}
        <div className={styles.ticketPageInfo}>
          <h2>Información del vuelo</h2>
          <BasicTicketinfo {...{ ...state.offerProps, ...dataFromQuery }} />
        </div>

        {/* Buttons */}
        <div className={styles.ticketPageButtons}>
          <button onClick={history.goBack}>Cancelar</button>
          <Link to="/">Continuar</Link>
        </div>
      </section>
    </main>
  );
}
