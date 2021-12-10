import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { isAvailable } from "../../redux/actions";

export default function FavCard(props) {
  const favs = useSelector((state) => state.favs);
  const dispatch = useDispatch();

  const available = (e) => {
    e.preventDefault();
    dispatch(isAvailable(e.target.value));
  };

  return (
    <div>
      {favs?.map((fav) => {
        return (
          <div key={fav.id}>
            {fav.origin}
            {fav.destination}
            {`${fav.price}`}
            <button>X</button>
            <button value={fav.flightId} onClick={available}>¿Sigue disponible?</button>
            <button>Buscar similares</button>
          </div>
        );
      })}
    </div>
  );
}
