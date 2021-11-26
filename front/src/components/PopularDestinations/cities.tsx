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
      description:"",
      placesOfInterest:[],
      images:[""]
    },
    {
      name: "London",
      image: london,
      id: "london",
      description:"",
      placesOfInterest:[],
      images:[]
    },
    {
      name: "México",
      image: mexico,
      id: "mexico",
      description:"",
      placesOfInterest:[],
      images:[]
    },
    {
      name: "New York",
      image: newYork,
      id: "new-york",
      description:"",
      placesOfInterest:[],
      images:[]
    },
    {
      name: "Paris",
      image: paris,
      id: "paris",
      description:"",
      placesOfInterest:[],
      images:[]
    },
    {
      name: "Toronto",
      image: toronto,
      id: "toronto",
      description:"",
      placesOfInterest:[],
      images:[]
    },
  ];
};

export default cities();
