import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlight } from "../../redux/actions";
import styles from "./Searchbar.module.scss";
import json from '../../assets/IATA.json';
import CountrySelect from "./select"
export default function SearchBar() {


  // const stadoBusqueda:any = useSelector(state => state.allFlight)


  // console.log(json.map(p => p.airport))
  const dispatch = useDispatch();

  const [filterOptional, setFilterOptional] = useState([])

  const [value, setValue] = useState({
    originCity: "",
    destinyCity: "",
    departureDate: "",
    returnDate: "",
    journeyType: "",
    class: "Economy",
  });

  function handleChangeOrigen(e: any) {
    e.preventDefault();
    setValue({
      ...value,
      originCity: e.target.value
    });
    const cities: any = json.filter(d => d.city.toLowerCase().includes(value.originCity.toLowerCase()));

    const airports: any = cities.map((d: any) => d.airport)

    setFilterOptional(airports)




    console.log(airports)
  }

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
      <span> Encuentra las mejores ofertas </span>
      <CountrySelect/>
      <form>


        <div className={styles.selects}>
          <label> Vuelos </label>
          <select name="journeyType" onChange={(e) => handleCheck(e)}>
            <option value="" > Solo ida </option>
            <option value="true" > Ida y vuelta </option>
          </select>
        </div>

        <div className={styles.origin}>
          <label> Origen </label>
          <input type="text" name="originCity" onChange={e => handleChangeOrigen(e)} />
          {value.originCity ? filterOptional.map(d => <p>{d}</p>) : (
            false
          )}
        </div>

        <div className={styles.destiny}>
          <label> Destino </label>
          <input type="text" name="destinyCity" onChange={handleChange} />
          {value.destinyCity ? (
            <select className={styles.selects}>
              {/* {airports.map((airp) => (<option className="op" value={airp.id}> {airp.name} </option>))} */}
            </select>
          ) : (
            false
          )}
        </div>

        <div className={styles.departureDate}>
          <label> Fecha de salida </label>
          <input
            className={styles.data}
            type="date"
            placeholder=""
            name="departureDate"
            onChange={handleChange}
          />
        </div>

        {value.journeyType ? <div className={styles.retunDate}>
          <label> Fecha de retorno </label>
          <input
            className={styles.data}
            type="date"
            placeholder=""
            name="returnDate"
            onChange={handleChange}
          />
        </div> : false}


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
          <select name='class' className={styles.calss} onChange={handleChange}>
            <option value='Economy'> Economy </option>
            <option value='Premium-economy'> Premium-economy </option>
            <option value='First'> First </option>
            <option value='Business'> Business </option>
          </select>
        </div>

        <div>
          <button onClick={handleClick}>dsdsd</button>
        </div>
      </form>
      {/* <button onClick={console.log()}></button> */}
    </div>
  );
}

