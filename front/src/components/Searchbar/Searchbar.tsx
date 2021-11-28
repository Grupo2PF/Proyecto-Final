import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlight } from "../../redux/actions";
import styles from "./Searchbar.module.scss";
import json from '../../assets/IATA.json';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faMapMarkerAlt, faPlane, faPlaneArrival, faPlaneDeparture, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function SearchBar() {


  // const stadoBusqueda:any = useSelector(state => state.allFlight)


  // console.log(json.map(p => p.airport))
  const dispatch = useDispatch();

  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filterOptional, setFilterOptional] = useState([])
  const [value, setValue] = useState({
    originCity: "",
    destinyCity: "",
    departureDate: "",
    returnDate: "",
    journeyType: "",
    class: "Economy",
  });



  function onChageAux(e: any) {
    const userInput = e.target.value;





  }






  ///////// Logica autocompletado /////////
  function handleChangeOrigen(e: any) {
    e.preventDefault();
    setValue({
      ...value,
      originCity: e.target.value
    });

    console.log(filterOptional)
  }





  async function filterCompleted() {
    const cities: any = json.filter(d => d.city.toLowerCase().includes(value.originCity.toLowerCase()));
    const airports: any = cities.map((d: any) => d.airport)

    setFilterOptional(airports.slice(0, 5))
    console.log(filterOptional)
  }

  useEffect(() => {
    // filterCompleted()
  }, [])



  function combo(e: any) {
    handleChangeOrigen(e)

    if (value.originCity.length > 3) { filterCompleted() }

  }

  ////////////////////////////////////////////




  function handleChange(e: any) {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }
  function handleClick(e: any) {
    e.preventDefault();
    dispatch(getFlight(value));
    // console.log(value)
  }

  function handleCheck(e: any) {
    e.preventDefault();
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div className={styles.searchBarContainer}>
      <div className={styles.titleBox}>

        <h3> Encuentra las mejores ofertas </h3>
      </div>
      <form>













        <div className={styles.selects}>
          <label> Origen </label>
          <div className={styles.inputBox}>
            <FontAwesomeIcon className={styles.icon} icon={faPlaneDeparture} />
            <input type="text" />
          </div>



          < ul role="listbox">
            {value.originCity.length > 3 ? filterOptional.map((d: any) => d ? <li ><span > {d}</span></li> : false) : false}
          </ul>

        </div>





        <div className={styles.selects}>
          <label> Destino </label>
          <div className={styles.inputBox}>
            <FontAwesomeIcon className={styles.icon} icon={faPlaneArrival} />

            <input type="text" name="destinyCity" onChange={handleChange} />
          </div>
          {value.destinyCity ? (
            <select className={styles.selects}>
              {/* {airports.map((airp) => (<option className="op" value={airp.id}> {airp.name} </option>))} */}
            </select>
          ) : (
            false
          )}
        </div>

        <div className={styles.selects}>
          <label> Vuelos </label>

          <div className={styles.inputBox}>
            <FontAwesomeIcon className={styles.icon} icon={faPlane} />

            <select name="journeyType" onChange={(e) => handleCheck(e)}>
              <option value="" > Solo ida </option>
              <option value="true" > Ida y vuelta </option>
            </select>
          </div>
        </div>



        <div className={styles.dataBox}>


          <div className={styles.selectsData}>
            <label> Ida </label>
            <input
              className={styles.inputBox}
              type="date"
              placeholder=""
              name="departureDate"
              onChange={handleChange}
            />
          </div>




          {value.journeyType ? <div className={styles.selectsData}>
            <label> Vuelta </label>
            <input
              className={styles.inputBox}
              type="date"
              placeholder=""
              name="returnDate"
              onChange={handleChange}
            />
          </div> : false}

        </div>

        {/*      <div className={styles.selects}>
          <label> Cantidad de pasajeros </label>
          <select className={styles.passengers}>
            <option> 1 </option>
            <option> 2 </option>
            <option> 3 </option>
            <option> 4 </option>
            <option> 5 </option>
          </select>
        </div> */}

        <div className={styles.selects}>
          <label> Clase </label>
          <div className={styles.inputBox}>

            <select name='class' onChange={handleChange}>
              <option value='Economy'> Economy </option>
              <option value='Premium-economy'> Premium-economy </option>
              <option value='First'> First </option>
              <option value='Business'> Business </option>
            </select>
          </div>
        </div>



        <div className={styles.botonBox}>
          <button className={styles.boton} onClick={handleClick}>Buscar
            <FontAwesomeIcon className={styles.iconSearch} icon={faSearch} />
          </button>
        </div>
      </form>
      {/* <button onClick={console.log()}></button> */}
    </div>
  );
}

