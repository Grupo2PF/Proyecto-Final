<<<<<<< HEAD
import {
  GET_FLIGHT
} from "../actionTypes"

import { flightActions, flightState } from "../types"

const initialState : flightState = {
     results: {}
  };


  export default (state = initialState, action:flightActions)=> {
=======
import { GET_FLIGHT } from "../actionTypes";

const initialState:object = {
  allFlight:{},
  };

  type Action = { 
    type: string,
    payload: object|null
  
  };
 
  export default function rootReducer(state = initialState, action:Action) {
>>>>>>> origin/Esteban
    switch (action.type) {
      case GET_FLIGHT:
        return {
          ...state,
<<<<<<< HEAD
          results: action.payload
        };
      default:
      return {
        ...state,
      };
    }
=======
          allFlight: action.payload
        }
        
      default:
        return state;
    }

      
>>>>>>> origin/Esteban
  }