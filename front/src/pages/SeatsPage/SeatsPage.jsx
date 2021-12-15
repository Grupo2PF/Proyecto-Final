
import React from 'react'
import {  useHistory, useLocation } from "react-router-dom";
import {  useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./seatsPage.module.css"
import OtherBox from "./OtherBox"
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import seatsDefault from "./seatsDefault"
import { getSeats } from '../../redux/actions';
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";


export default function SeatsPage() {
    const [input, setInput] = useState([])
    const { state } = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const offerId = state.offer.offers
    
    useEffect(() => {
        dispatch(getSeats(offerId));
    }, []);
    
   // desde STATE useLocation
    const pax = state.passengers
   //desde redux/api
    const seats = useSelector((state) => state.allSeats);
    const firstOprtionSeats  = seats.seatsByFlight
    console.log(firstOprtionSeats)
    //caso default 
    const { economySeatsDefault, firstSeatsDefault , otherDefault } = seatsDefault
    const { seatsByFlight } = otherDefault
    console.log(seatsByFlight)

    const finalSeats = firstOprtionSeats ? firstOprtionSeats : seatsByFlight

    const handleCheck = (e) =>{
        let checked = e.target.checked

        if(checked && input.length < allSeatsLimit){ 
            console.log(input)
            setInput([...input, e.target.value])
            if(input.length === pax.length -1) return alert(`asiento ${e.target.value} seleccionado exitosamente! Recuerda, se tomaran como validos unicamente ${pax.length} asiento por vuelo`)
              else alert(`asiento ${e.target.value} seleccionado exitosamente`)
        } else{ 
            alert("ya seleccionaste todos los asientos, si quieres volver a elejirlos o cambiarlos antes de confirmar, puedes actualizar el navegador y elejirlos nuevamente")
            console.log(input)
        }
    }

    const handleSubmit = () => {
        console.log(input)
        console.log(allSeatsLimit)
        if(input.length < allSeatsLimit ) return alert("faltan asientos por elegir")
        if(input.length > allSeatsLimit) return alert("ya seleccionaste todos los asientos")
        else if (input.length === allSeatsLimit) return history.push({ 
              pathname : "/pay",
              state: {...state, input} 
            });
        
    }
    console.log(finalSeats)

      const flightsId = finalSeats.map( e => e.id)
      console.log(flightsId)

     const allSeatsLimit = pax.length * finalSeats.length
     console.log(allSeatsLimit)
     
    function renderAviones() {
        
            const allFlightSeats = finalSeats.map( e => <div>
                <div className={styles.rotulo}>
               <img src={logo} alt="logo" className={styles.logo} display="center"/>
                 <div>Elije los <b>{pax.length} asientos</b> de cada vuelo</div>
                 </div>
                  { 
                 e.seatsInfo[0].map( e => (
                <div className={styles.fila}>
                   <h1>II</h1> 
                    { e.map( columna => ( 
                    <div className={styles.columna}>{
                        columna.map( x => x.numberAndLetter
                            ?  <div>
                            { x.available.length === 0 
                          ? <div>
                            <input type="checkbox" name="libre" 
                            id={x.numberAndLetter}
                            value={x.numberAndLetter} 
                            onChange={(e)=> handleCheck(e)}/>
                            </div>
                         : <div >
                           <input 
                           type="checkbox" 
                           name="ocupado" 
                           value="ocupado" 
                           disabled >
                             </input></div>
                           } <div className={styles.numbLett}>{x.numberAndLetter}</div>
                        </div>
                            : <OtherBox className={styles.other} type={x.type}/> )
                        }</div>
                    ))}
                <h1>II</h1> 
                </div> 
            )) } 
           
            </div> )
/*
            const secondFloorFlight = seatsByFlight.map( e => <div>
                { e.seatsInfo[1] ?
                e.seatsInfo[1].map( e => (
               <div className={styles.fila}>
                   { e.map( columna => ( 
                   <div className={styles.columna}>{
                       columna.map( e => e.numberAndLetter
                           ? <SeatBox numberAndLetter={e.numberAndLetter} restrictions={e.restrictions} available={e.available}  /> 
                           : <OtherBox type={e.type}/> )
                       }</div>
                   ))}
               </div>
           )): null  }   
           </div> )*/


        return ( 
                <div className={styles.allSeats}>
                  <GoHomeButton />   
                <div className={styles.container}>
                <div className={styles.oneCard}>    
                 </div>
                 <div>{allFlightSeats}</div>
                 <div className={styles.buttondiv}>
                <button className={styles.buttonSubmit} type="submit"
                onClick={()=>handleSubmit()}>
                    Confirmar asientos
                    </button>
            </div>  
                 
                 </div></div>)
    
    }
    
    return renderAviones()
}
