import React from 'react'
import { FaRestroom, FaUtensils,FaBabyCarriage,FaDoorOpen, FaVest } from "react-icons/fa"
import {BiExit} from "react-icons/bi"
import {BsDoorClosed} from "react-icons/bs"

export default function OtherBox({type}) {
 
    switch(type) {
     case "bassinet" :
         return <div><FaBabyCarriage/><n>{type}</n></div>;
     case "empty" :
            return <p> </p>;
    case "lavatory" :
            return <div><FaRestroom/><n>{type}</n></div>;
    case "exit_row" :
            return <div><BsDoorClosed/><n>{type}</n></div>;
    case "galley" :
            return <div><FaUtensils/><n>{type}</n></div>; 
    case "closet" :
            return <div><FaVest/><n>{type}</n></div>; 
    default :
         return <p>{type}</p>

 }

}
