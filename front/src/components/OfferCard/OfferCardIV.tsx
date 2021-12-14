import styles from "./OfferCard.module.scss";
import { useDispatch } from "react-redux";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa";
import { BsArrowLeftRight } from "react-icons/bs";
import { IoMdAirplane } from "react-icons/io";
import { getSeats, sendFavs } from "../../redux/actions/";
import {auth} from "../../firebaseConfig";
import { useLocation, Link} from "react-router-dom";

export default function OfferCardIV(props: any): JSX.Element {
  const dispatch = useDispatch();
  const location = useLocation();

  // const handleBuy = (e: any) => {
  //   const id = props.offers;
  //   dispatch(getSeats(id));
  // };

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
      transfersD: item.departure.transfers,
      transfersR: item.return.transfers,
      mode: props.mode,
      originCity: props.originCity,
      destinationCity: props.destinationCity,
      originAirport: props.originAirport,
      destinationAirport: props.destinationAirport,
      ...dataFromQuery,
    };
  });

  const offerProps = {
    ...props,
    recomendations: formatedRecomendations,
  };
  // console.log("Ida y Vuelta: ", offerProps);

  const handleFavs = (e: any) => {
    if(auth.currentUser){
    
    const info = {
      ...dataFromQuery,
      userId: auth.currentUser.uid,
     ...props
    }
    console.log(info);
      if (dispatch(sendFavs(info))) {
        // @ts-ignore
        swal({
          title: "Se ha agregado a favoritos",
          text: "El vuelo se ha agregado a tus favoritos",
          icon: "success",
        }).then(() => console.log("added"));
      }
  }else{
    alert("Debes iniciar sesión para poder agregar a favoritos")
  }
}

  return (
    <>
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
              {props.transfersD.length === 1 ? (
                <p>
                  <IoMdAirplane /> Vuelo directo
                </p>
              ) : (
                <p>
                  <BsArrowLeftRight /> Tiene {props.transfersD.length - 1}{" "}
                  escalas
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
              <Link
                to={{
                  pathname: `/ticket/${props.offers}`,
                  state: {
                    ...offerProps,
                    ...dataFromQuery,
                  },
                }}
                className={styles.offersCardButtonsPrice}
                // onClick={handleBuy}
              >
                {`${props.currency} ${props.price}`}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
