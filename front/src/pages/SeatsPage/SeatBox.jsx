import userEvent from '@testing-library/user-event';
import React, { useEffect, useState } from 'react'
import { FaUserPlus } from "react-icons/fa"
import { Link, useHistory, useLocation } from "react-router-dom";


export default function SeatBox({numberAndLetter, restrictions, available, pax}) {

  const [input, setInput] = useState([])

  var allSeats = []

function handleCheck(e) {
  let finalSeats = e.target.value
  var newInput = [...input]
  newInput.push(finalSeats)
  setInput(newInput)
  console.log(input)
      }
 
   return (
        <div>
            { available.length === 0 
          ? <div>
            <input type="checkbox" name="libre" 
            id={numberAndLetter}
            value={numberAndLetter} 
            onChange={(e)=> handleCheck(e)}/>
            </div>
         : <div >
           <input 
           type="checkbox" 
           name="ocupado" 
           value="ocupado" 
           disabled >
             </input></div>
           } <p>{numberAndLetter}</p>
        </div>
    )
  }
