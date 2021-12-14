import styles from "./OfferCard.module.scss";
import { useDispatch } from "react-redux";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { BsArrowLeftRight } from "react-icons/bs";
import { IoMdAirplane } from "react-icons/io";
// import { getSeats, sendFavs } from "../../redux/actions/";
import { sendFavs } from "../../redux/actions/";
import {Link, useHistory, useLocation} from "react-router-dom";
import { auth } from "../../firebaseConfig";

export default function OfferCardI(props: any): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();


  const dataFromQuery: any = {};

  const getQueryData = (offerQuery: any) => {
    return offerQuery
      .split("&")
      .map((word: any) =>
        word
          .replace("=", ",")
          .replace("?", "")
          .split(",")
      )
      .forEach((el: any) => (dataFromQuery[el[0]] = el[1]));
    };
    getQueryData(location.search);

  const formatedRecomendations = props.recomendations?.map((item: any) => {
    return {
      offers: item.id,
      currency: item.currency,
      price: item.price,
      transfers: item.transfers,
      mode: props.mode,
      originCity: item.origin.city,
      destinationCity: item.destiny.city,
      originAirport: item.origin.airport,
      destinationAirport: item.destiny.airport,
      ...dataFromQuery,
    };
  });

  const offerProps = {
    ...props,
    recomendations: formatedRecomendations,
  };

  const handleFavs = (e: any) => {
    if(auth.currentUser){
    const info = {
      ...dataFromQuery,
      userId: auth.currentUser.uid,
      ...props
    }
    console.log("info")
    console.log(info)

    if (dispatch(sendFavs(info))) {
      // @ts-ignore
      swal({
        title: "Se ha agregado a favoritos",
        text: "El vuelo se ha agregado a tus favoritos",
        icon: "success",
      }).then(() => console.log("added"));
    }
    }else{
      // @ts-ignore
      swal({
        title: "Debes iniciar sesión",
        text: "Para poder agregar a favoritos debes estar registrado",
        icon: "warning",
        dangerMode: true,
      }).then(() => history.push("/login"));
    }
  };

  /*Funcion para validar login al comprar*/
  const handleBuy = (e: any) => {
    e.preventDefault();
    if (auth.currentUser) {
      history.push({
        pathname: `/ticket/${props.offers}`,
        state: {
          ...offerProps,
          ...dataFromQuery
      }
    });
     } else {
      // @ts-ignore
      swal({
        title: "Debes iniciar sesión para comprar",
        icon: "warning",
        dangerMode: true,
      }).then(() => history.push("/login"));
    }
  };

  return (
    <section className={styles.offers}>
      <div className={styles.offersCard}>
        <div className={styles.offersCardMainInfo}>
          {/* Puntos de partida y llegada */}
          <div className={styles.offersCardInfo}>
            <p>
              <FaPlaneDeparture />{" "}
              {props.originCity ? props.originCity : props.originAirport}{" "}
            </p>
            <p>
              <FaPlaneArrival />{" "}
              {props.destinationCity
                ? props.destinationCity
                : props.destinationAirport}{" "}
            </p>
          </div>

          {/* Tipo de vuelo */}
          <div className={styles.offersCardType}>
            {props.transfers.length === 1 ? (
              <p>
                {" "}
                <IoMdAirplane /> Vuelo directo{" "}
              </p>
            ) : (
              <p>
                {" "}
                <BsArrowLeftRight /> Tiene {props.transfers.length - 1} escalas
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className={styles.offersCardButtons}>
            <Link
              to={{
                pathname: `/offer-detail/${props.offers}`,
                state: {
                  ...offerProps,
                  ...dataFromQuery,
                },
              }}
              className={styles.offersCardButtonsDetail}
            >
              <AiOutlineExclamationCircle />
              Ver detalles
            </Link>
            <button onClick={handleFavs}>Añadir a favs</button>
            <button
              className={styles.offersCardButtonsPrice}
              onClick={handleBuy}
            >
              {`${props.currency} ${props.price}`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
