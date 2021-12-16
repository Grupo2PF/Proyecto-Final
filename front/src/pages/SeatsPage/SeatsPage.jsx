import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./seatsPage.module.scss";
import OtherBox from "./OtherBox";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import seatsDefault from "./seatsDefault";
import { getSeats } from "../../redux/actions";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";

export default function SeatsPage() {
    const [input, setInput] = useState([])
    const [inputSegundo, setInputSegundo] = useState([])
    const [inputTres, setInputTres] = useState([])
    const [inputCuatro, setInputCuatro] = useState([])
    const [ checkState, setCheckState] = useState(false)

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
    console.log(seats)

    const { economySeatsDefault, firstSeatsDefault , otherDefault } = seatsDefault
    const { seatsByFlight } = otherDefault
    
    const finalSeats = firstOprtionSeats ? firstOprtionSeats : seatsByFlight

    const handleCheckIda = (e) =>{
        let checked = e.target.checked
        let valor = e.target.value

        if(input.includes(valor)) {
             console.log("hola")
            let nuevoArray = input.filter(x => x !== valor)
            console.log(nuevoArray)
           setInput(nuevoArray)
        }

        if(checked && input.length < pax.length){ 
            setInput([...input, e.target.value])
        }
    }

    const handleCheckSegundo = (e) =>{
        let checked = e.target.checked
        let valor = e.target.value

        if(inputSegundo.includes(valor)) {
             console.log("hola")
            let nuevoArray = inputSegundo.filter(x => x !== valor)
            console.log(nuevoArray)
           setInputSegundo(nuevoArray)
        }

        if(checked && inputSegundo.length < pax.length){ 
            setInputSegundo([...inputSegundo, e.target.value])
        }
    }

    const handleCheckTercero = (e) =>{
        let checked = e.target.checked
        let valor = e.target.value

        if(inputTres.includes(valor)) {
             console.log("hola")
            let nuevoArray = inputTres.filter(x => x !== valor)
            console.log(nuevoArray)
            setInputTres(nuevoArray)
        }

        if(checked && inputTres.length < pax.length){ 
            //setCheckState(true)
            setInputTres([...inputTres, e.target.value])
        }
    }

    const handleCheckCuarto = (e) =>{
        let checked = e.target.checked
        let valor = e.target.value

        if(inputCuatro.includes(valor)) {
             console.log("hola")
            let nuevoArray = inputCuatro.filter(x => x !== valor)
            console.log(nuevoArray)
            setInputCuatro(nuevoArray)
        }

        if(checked && inputCuatro.length < pax.length){ 

            setInputCuatro([...inputCuatro, e.target.value])
        }
    }


      const actualSeats = [ ...input, ...inputSegundo, ...inputTres, ...inputCuatro ]

      const allSeats = [[ ...input], [...inputSegundo], [...inputTres] , [...inputCuatro]]

    const handleSubmit = () => {
        if(actualSeats.length < allSeatsLimit ) return alert("faltan asientos por elegir")
        if(actualSeats.length > allSeatsLimit) return alert("ya seleccionaste todos los asientos")
        else if (actualSeats.length === allSeatsLimit) return history.push({ 
              pathname : "/pay",
              state: {...state, allSeats} 
            });
    };

 const handleDisabledOne = (e) => {
       console.log(e.target)
      let checked = document.getElementById(e)
        if(pax.length === input.length) {
            if ( checked.checked) {
                return false }
            return true
        }
     }

     const handleDisabledTwo = (e) => {
        console.log(e.target)
       let checked = document.getElementById(e)
         if(pax.length === inputSegundo.length) {
             if ( checked.checked) {
                 return false }
             return true
         }
      }

      const handleDisabledTree = (e) => {
        console.log(e.target)
       let checked = document.getElementById(e)
         if(pax.length === inputTres.length) {
             if ( checked.checked) {
                 return false }
             return true
         }
      }

      const handleDisabledFourt = (e) => {
        console.log(e.target)
       let checked = document.getElementById(e)
         if(pax.length === inputCuatro.length) {
             if ( checked.checked) {
                 return false }
             return true
         }
      }

    const allSeatsLimit = pax.length * finalSeats.length;
     
     const firstFlight = finalSeats[0]
     const secondFlight = finalSeats[1]
     const tirdFlight = finalSeats[2]
     const fourtFlight = finalSeats[3]
     
    function renderAviones() {
        const oneFlight = (<div>
                <div className={styles.rotulo}>
               <img src={logo} alt="logo" className={styles.logo} display="center"/>
                 <div>Elije los <b>{pax.length} asientos</b> del vuelo</div>
                 </div>
                  { 
                 firstFlight.seatsInfo[0].map( e => (
                <div className={styles.fila}>
                   
                   <h1>II</h1> 
                    { e.map( columna => ( 
                    <div className={styles.columna}>{
                        columna.map( x => x.numberAndLetter
                            ?  <div>
                            { x.available.length === 0 
                          ? <div>
                            <input type="checkbox" name="libre" title="ckeckida"
                            id={`${x.numberAndLetter}${firstFlight.id}`}
                            value={x.numberAndLetter} 
                            disabled = {handleDisabledOne(`${x.numberAndLetter}${firstFlight.id}`  )}
                            onChange={(e)=> handleCheckIda(e)}/>
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

     const dobleFlight = secondFlight ? (<div>
        <div className={styles.rotulo}>
       <img src={logo} alt="logo" className={styles.logo} display="center"/>
         <div>Elije los <b>{pax.length} asientos</b> del vuelo</div>
         </div>
          { 
         secondFlight.seatsInfo[0].map( e => (
        <div className={styles.fila}>
           
           <h1>II</h1> 
            { e.map( columna => ( 
            <div className={styles.columna}>{
                columna.map( x => x.numberAndLetter
                    ?  <div>
                    { x.available.length === 0 
                  ? <div>
                  <input type="checkbox" name="libre" title="ckeckida"
                  id={`${x.numberAndLetter}${secondFlight.id}`}
                  value={x.numberAndLetter} 
                  disabled ={handleDisabledTwo(`${x.numberAndLetter}${secondFlight.id}`)}
                  onChange={(e)=> handleCheckSegundo(e)}/>
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
   
    </div> ) : null

    const tripleFlight = tirdFlight ? (<div>
        <div className={styles.rotulo}>
       <img src={logo} alt="logo" className={styles.logo} display="center"/>
         <div>Elije los <b>{pax.length} asientos</b> del vuelo </div>
         </div>
          { 
         tirdFlight.seatsInfo[0].map( e => (
        <div className={styles.fila}>
           
           <h1>II</h1> 
            { e.map( columna => ( 
            <div className={styles.columna}>{
                columna.map( x => x.numberAndLetter
                    ?  <div>
                    { x.available.length === 0 
                  ? <div>
                  <input type="checkbox" name="libre" title="ckeckida"
                  id={`${x.numberAndLetter}${tirdFlight.id}`}
                  value={x.numberAndLetter} 
                  disabled = {handleDisabledTree(`${x.numberAndLetter}${tirdFlight.id}`)}
                  onChange={(e)=> handleCheckTercero(e)}/>
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
 
    </div> ) : null

  const lastFlight = fourtFlight ? (<div>
    <div className={styles.rotulo}>
   <img src={logo} alt="logo" className={styles.logo} display="center"/>
     <div>Elije los <b>{pax.length} asientos</b> del vuelo</div>
     </div>
      { 
     fourtFlight.seatsInfo[0].map( e => (
    <div className={styles.fila}>
       
       <h1>II</h1> 
        { e.map( columna => ( 
        <div className={styles.columna}>{
            columna.map( x => x.numberAndLetter
                ?  <div>
                { x.available.length === 0 
              ? <div>
              <input type="checkbox" name="libre" title="ckeckida"
              id={`${x.numberAndLetter}${fourtFlight.id}`}
              value={x.numberAndLetter} 
              disabled = {handleDisabledFourt(`${x.numberAndLetter}${fourtFlight.id}`)}
              onChange={(e)=> handleCheckCuarto(e)}/>
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

</div> ) : null

        return (
            <div className={styles.allSeats}>
                <GoHomeButton />
                <div className={styles.container}>
                <div className={styles.oneCard}>    
                 </div>
                 <div>{oneFlight}</div>
                 <div>{dobleFlight ? dobleFlight: null}</div>
                 <div>{tripleFlight ? tripleFlight: null}</div>
                 <div>{lastFlight ? lastFlight: null}</div>

                 <div className={styles.buttondiv}>
            </div>  
            <button className={styles.buttonSubmit} type="submit"
                onClick={()=>handleSubmit()}>
                    Confirmar asientos
                    </button>
                 </div></div>)
    
    }

    return renderAviones();
}
