import { useSelector} from "react-redux";

export default function FavCard(props) {

    const favs = useSelector(state => state.favs);

    return (
        <div>
            {favs.map(fav => {
                return (
                    <div className="card" key={fav.id}>
                        {fav.origin}
                        {fav.destination}
                        {`${fav.price}`}
                        <button>X</button>
                        <button>¿Sigue disponible?</button>
                        <button>Buscar similares</button>
                    </div>
                )
            })}
        </div>
    )
}