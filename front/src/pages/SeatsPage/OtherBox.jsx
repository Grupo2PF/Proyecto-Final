import { FaRestroom, FaUtensils,FaBabyCarriage, FaVest } from "react-icons/fa"
import {BsDoorClosed} from "react-icons/bs"

export default function OtherBox({type}) {
 
    switch(type) {
     case "bassinet" :
         return <div><FaBabyCarriage/><p>{type}</p></div>;
     case "empty" :
            return <p> </p>;
    case "lavatory" :
            return <div><FaRestroom/><p>{type}</p></div>;
    case "exit_row" :
            return <div><BsDoorClosed/><p>{type}</p></div>;
    case "galley" :
            return <div><FaUtensils/><p>{type}</p></div>; 
    case "closet" :
            return <div><FaVest/><p>{type}</p></div>; 
    default :
         return <p>{type}</p>

 }

}
