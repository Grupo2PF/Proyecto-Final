import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { isAvailable } from "../../redux/actions";
import { useHistory, Redirect } from "react-router-dom";

export default function FavCard(props) {
  const favs = useSelector((state) => state.favs);
  const yetAvailable = useSelector((state) => state.availableFlight);
  const dispatch = useDispatch();
  const history = useHistory();




  useEffect(() => {;

  }, [yetAvailable]);

  const available = (e) => {
    e.preventDefault();
    dispatch(isAvailable(e.target.value));
    console.log(yetAvailable)
    if (yetAvailable.class){
   if (window.confirm("El vuelo esta disponible, desea comprarlo?")) {
    history.push({
      pathname: '/pruebaprops',
      state: {objeto: yetAvailable}
    })
   }}
  };

  return (
    <div>
      {favs?.map((fav) => {
        console.log(fav);
        return (
          <div key={fav.id}>
            {fav.origin}
            {fav.destination}
            {`${fav.price}`}
            <button>X</button>
            <button value={{flightId:fav.flightId, mode: fav.mode}} onClick={available}>
              ¿Sigue disponible?
            </button>
            <button>Buscar similares</button>
          </div>
        );
      })}
    </div>
  );
}
