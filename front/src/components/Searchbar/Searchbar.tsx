import React, { useEffect, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFlight } from "../../redux/actions";
import styles from "./Searchbar.module.scss";
import json from '../../assets/IATA.json';
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseUser, faMapMarkerAlt, faPlane, faPlaneArrival, faPlaneDeparture, faSearch } from "@fortawesome/free-solid-svg-icons";
import ExtraBox from "./ExtraBox/ExtraBox";



export default function SearchBar() {




  const [error, setError] = useState(false)
  const [extraBox, setExtraBox] = useState(false)
  const [filterOptional, setFilterOptional] = useState([])
  const [filterOptionalBack, setFilterOptionalBack] = useState([])

  const [value, setValue] = useState({
    originCity: "",
    destinyCity: "",
    departureDate: "",
    returnDate: "",
    journeyType: false,
    class: "Economy",
    baby: 1,
    kid: 2,
    adult: 1
  });



  ///////// Logica autocompletado /////////
  function handleChangeOrigen(e: any) {
    e.preventDefault();
    setValue({
      ...value,
      originCity: e.target.value
    });
  }
  function handleChangeBack(e: any) {
    e.preventDefault();
    setValue({
      ...value,
      destinyCity: e.target.value
    });

  }

  function filterCompleted() {
    const cities: any = json.filter(d => d.city.toLowerCase().includes(value.originCity.toLowerCase()) || d.airport.toLowerCase().includes(value.originCity.toLowerCase()));
    const airports: any = cities.map((d: any) => d.airport)
    setFilterOptional(airports.slice(0, 5))

  }
  function filterCompletedBack() {
    const citiesB: any = json.filter(d => d.city.toLowerCase().includes(value.destinyCity.toLowerCase()));
    const airportsB: any = citiesB.map((d: any) => d.airport)
    setFilterOptionalBack(airportsB.slice(0, 5))

  }

  function combo(e: any) {
    handleChangeOrigen(e)
    if (value.originCity.length > 2) { filterCompleted() }
  }
  function comboBack(e: any) {
    handleChangeBack(e)
    if (value.destinyCity.length > 2) { filterCompletedBack() }
  }

  function handleSelectCountry(e: any) {
    e.preventDefault()
    setValue({
      ...value,
      originCity: e.target.name,
    });
    setFilterOptional([])
  }
  function handleSelectCountryBack(e: any) {
    e.preventDefault()
    setValue({
      ...value,
      destinyCity: e.target.name,
    });
    setFilterOptionalBack([])
  }
  ////////////////////////////////////////////



  ///////// Logica Selects ///////
  function handleChange(e: any) {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  }
  ////////////////////////////////////////////


  ///////// Click JourneyType (logica para que llegue booleano al value object) /////////
  function handleChangeJourney(e: any) {
    e.preventDefault()
    const val: string = e.target.value

    if (val === 'true') {
      setValue({
        ...value,
        journeyType: true
      })
    } else if (val === 'false') {
      setValue({
        ...value,
        journeyType: false
      })
    }
  }
  ////////////////////////////////////////////


  ///////// Click enviar formulario /////////
  function handleClick(e: any) {
    e.preventDefault();
    const cities: any = json.filter(d => d.airport.toLowerCase().includes(value.originCity.toLowerCase()));
    const citiesBack: any = json.filter(d => d.airport.toLowerCase().includes(value.destinyCity.toLowerCase()));


    if (cities.length === 1 && citiesBack.length === 1) {


      // const origin: any = json.filter(data => data.airport === value.originCity)
      // const back: any = json.filter(data => data.airport === value.destinyCity)


      console.log()

      const toSend: any = {
        originCity: cities[0].iata,
        destinyCity: citiesBack[0].iata,
        departureDate: value.departureDate,
        returnDate: value.returnDate,
        journeyType: value.journeyType,
        class: value.class,
        baby: value.baby,
        kid: value.kid,
        adult: value.adult
      }

      console.log(cities)
      console.log(citiesBack)

      console.log(toSend)
      // dispatch(getFlight(toSend));
    } else { setError(true) }



  }
  ////////////////////////////////////////////


  function handleExtraBox(e: any) {
    e.preventDefault()
    setExtraBox(!extraBox)
  }







  return (
    <div className={styles.searchBarContainer}>

      {error ? <Errorr setError={setError} /> : false}

      <div className={styles.titleBox}>

        <h3> Encuentra las mejores ofertas </h3>
      </div>
      <form>






        <div className={styles.selects}>
          <label> Origen </label>
          <div className={styles.inputBox}>
            <FontAwesomeIcon className={styles.icon} icon={faPlaneDeparture} />
            <input name='originCity' value={value.originCity} type="text" onChange={e => combo(e)} autoComplete='off' />
          </div>





          <div className={styles.ulBox}>

            < ul role="listbox">
              {value.originCity.length > 2 ? filterOptional.map((d: any) =>
                <li > <button name={d} onClick={e => handleSelectCountry(e)} >{d}</button></li>
              )
                : false}
            </ul>
          </div>

        </div>





        <div className={styles.selects}>
          <label> Destino </label>
          <div className={styles.inputBox}>
            <FontAwesomeIcon className={styles.icon} icon={faPlaneArrival} />

            <input type="text" name="destinyCity" value={value.destinyCity} onChange={e => comboBack(e)} autoComplete='off' />
          </div>


          <div className={styles.ulBox}>

            < ul role="listbox">
              {value.destinyCity.length > 2 ? filterOptionalBack.map((d: any) =>
                <li > <button name={d} onClick={e => handleSelectCountryBack(e)} >{d}</button></li>
              )
                : false}
            </ul>
          </div>

        </div>






        <div className={styles.selects}>
          <label> Vuelos </label>

          <div className={styles.inputBox}>
            <FontAwesomeIcon className={styles.icon} icon={faPlane} />

            <select name="journeyType" onChange={(e) => handleChangeJourney(e)}>
              <option value='false' > Solo ida </option>
              <option value='true' > Ida y vuelta </option>
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




          <div className={styles.selectsData}>
            <label className={value.journeyType ? styles.label : styles.labelDisableD} > Vuelta </label>
            <input
              disabled={!value.journeyType}
              className={value.journeyType ? styles.inputBox : styles.inputBoxDisabled}
              type="date"
              placeholder=""
              name="returnDate"
              onChange={handleChange}
            />
          </div>

        </div>

        {/*    <div className={styles.selects}>
          <label> Cantidad de pasajeros </label>
          <select className={styles.passengers}>
            <option> 1 </option>
            <option> 2 </option>
            <option> 3 </option>
            <option> 4 </option>
            <option> 5 </option>
          </select>
        </div> */}

        {/*    <div className={styles.selects}>
          <label> Clase </label>
          <div className={styles.inputBox}>

            <select name='class' onChange={handleChange}>
              <option value='Economy'> Economy </option>
              <option value='Premium-economy'> Premium-economy </option>
              <option value='First'> First </option>
              <option value='Business'> Business </option>
            </select>
          </div>
        </div> */}
        <div>

          {extraBox ? <ExtraBox handleChange={handleChange} setValue={setValue} value={value}/> : false}
          <button onClick={e => handleExtraBox(e)}>Hola ke hace</button>
        </div>

        <div className={styles.botonBox}>
          <button className={styles.boton} onClick={handleClick}>Buscar
            <FontAwesomeIcon className={styles.iconSearch} icon={faSearch} />
          </button>
        </div>
      </form>

    </div>
  );
}




const Errorr: FC<Props> = ({ setError }) => {

  return (
    <div className={styles.ErrorBox}>
      <div className={styles.errorr}>
        <h2>Debes ingresar Origen y Destinos validos</h2>
        <p>Si das Click en autocompletar no deberia dar problemas !</p>
        <button onClick={() => setError(false)}>Aceptar</button>
      </div>

    </div>

  )
}
type Props = {
  setError: any
}