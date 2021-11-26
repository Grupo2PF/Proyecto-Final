import styles from "./PopularDestinations.module.scss";
import cities from "./cities";
import CityCard from "../CityCard/CityCard";
import { Link } from "react-router-dom";

export default function PopularDestinations(): JSX.Element {
  return (
    <section className={styles.popularDestinations}>
      <h2>Destinos más populares</h2>

      <div className={styles.cityCardsContainer}>
        {cities.map((city): JSX.Element => {
          return (
            <Link key={city.id} to={`popular-destinations/${city.id}`}>
              <CityCard name={city.name} image={city.image} />;
            </Link>
          );
        })}
      </div>
    </section>
  );
}
