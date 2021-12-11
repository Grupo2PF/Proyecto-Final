import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { isAvailable } from "../../redux/actions";
import { useHistory, Redirect } from "react-router-dom";

export default function FavCard(props) {
  const favs = useSelector((state) => state.favs);
  const yetAvailable = useSelector((state) => state.availableFlight);
  const dispatch = useDispatch();
  const history = useHistory();

var fav = []

  
  const available = (e) => {
    e.preventDefault(); 
    fav = favs.filter((fav) => fav.flightId === e.target.value);
    dispatch(isAvailable(fav));
    
  };
  
useEffect(() => {
  isAvailable(fav);
  if (yetAvailable.class){
    if (window.confirm("El vuelo esta disponible, desea comprarlo?")) {
     history.push({
       pathname: '/pruebaprops',
       state: {objeto: yetAvailable}
     })
    }} 
}, [yetAvailable]);
  

  return (
    <div>
      {favs?.map((fav) => {
        console.log(fav)
        return (
          <div key={fav.id}>
            {fav.origin.city}
            {fav.destination.city}
            {`${fav.price}`}
            <button>X</button>
            <button value={fav.flightId} onClick={available}>
              ¿Sigue disponible?
            </button>
            <button>Buscar similares</button>
          </div>
        );
      })}
    </div>
  );
}
