import bali from "../../assets/cities/bali-indonesia.webp";
import london from "../../assets/cities/london-gran-bretain.webp";
import mexico from "../../assets/cities/mexico-df-mexico.webp";
import newYork from "../../assets/cities/new-york-eeuu.webp";
import paris from "../../assets/cities/paris-francia.webp";
import toronto from "../../assets/cities/toronto-canada.webp";
import { City } from "../CityCard/types";

const cities = (): Array<City> => {
  return [
    {
      name: "Bali",
      image: bali,
      id: "bali",
    },
    {
      name: "London",
      image: london,
      id: "london",
    },
    {
      name: "México",
      image: mexico,
      id: "mexico",
    },
    {
      name: "New York",
      image: newYork,
      id: "new-york",
    },
    {
      name: "Paris",
      image: paris,
      id: "paris",
    },
    {
      name: "Toronto",
      image: toronto,
      id: "toronto",
    },
  ];
};

export default cities();
