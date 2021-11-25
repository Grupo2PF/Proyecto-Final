import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getFlight } from "../../redux/actions";
import styles from "./Searchbar.module.scss";

export default function SearchBar() {

  const dispatch = useDispatch();
  const [value, setValue] = useState({
    originCity: "",
    destinyCity: "",
    departureDate: "",
    returnDate: "",
    journeyType: "",
    class: "",
  });

  function handleChange(e: any) {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }
    function handleClick(e: any) {
      e.preventDefault();
      dispatch(getFlight());
    }

    function handleCheck(e:any){
      e.preventDefault();
      setValue({
        ...value,
      [e.target.name]: e.target.value,
      });
    }

    return (
      <div className={styles.searchBarContainer}>
        <form>
          <span> Encuentra las mejores ofertas </span>


          <div className={styles.selects}>
            <label> Vuelos </label>
            <select name="journeyType" onChange={(e)=>handleCheck(e)}>
              <option value="" > Solo ida </option>
              <option value="true" > Ida y vuelta </option>
            </select>
          </div>

          <div className={styles.origin}>
            <label> Origen </label>
            <input type="text" name="originCity" onChange={handleChange} />
            {value.originCity ? (
              <select className={styles.selects}>
                {/* {airports.map((airp) => (<option className="op" value={airp.id}> {airp.name} </option>))} */}
              </select>
            ) : (
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
          </div> : false }
          <div className={styles.selects}>
            <label> Cantidad de pasajeros </label>
            <select className={styles.passengers}>
              <option> 1 </option>
              <option> 2 </option>
              <option> 3 </option>
              <option> 4 </option>
              <option> 5 </option>
            </select>
          </div>
          <div className={styles.selects}>
            <label> Clase </label>
            <select className={styles.calss}>
              <option> Economy </option>
              <option> Premium-economy </option>
              <option> First </option>
              <option> Business </option>
            </select>
          </div>
          <div>
            <button onClick={handleClick}>dsdsd</button>
          </div>
        </form>
      </div>
    );
  }

