import React from "react";
import styles from "./Searchbar.module.scss";

export default function SearchBar() {
  return (
    <div className={styles.searchBarContainer}>
      <form>
        <span> Encuentra las mejores ofertas </span>
        <div className={styles.checkbox}>
          <label> Ida y vuelta </label>
          <input className={styles.input} type="checkbox" />
          <label> Solo ida </label>
          <input className={styles.input} type="checkbox" />
        </div>
        <div className={styles.origin}>
          <label> Origen </label>
          <select className={styles.selects}>
          {/* {airports.map((airp) => (<option className="op" value={airp.id}> {airp.name} </option>))} */}
          </select>
        </div>
        <div className={styles.destinity}>
          <label> Destino </label>
          <select className={styles.selects}>
          {/* {airports.map((airp) => (<option className="op" value={airp.id}> {airp.name} </option>))} */}
          </select>
        </div>
        <div className={styles.departureDate}>
          <label> Fecha de salida </label>
          <input
            className={styles.data}
            type="data"
            placeholder=""
            name="name"
          />
        </div>
        <div className={styles.retunDate}>
          <label> Fecha de retorno </label>
          <input
            className={styles.data}
            type="data"
            placeholder=""
            name="name"
          />
        </div>
        <div className={styles.checkbox}>
          <label> Cantidad de pasajeros </label>
          <select className={styles.passengers}>
          <option> 1 </option>
          <option> 2 </option>
          <option> 3 </option>
          <option> 4 </option>
          <option> 5 </option>
          </select>
        </div>
      </form>
    </div>
  );
}
