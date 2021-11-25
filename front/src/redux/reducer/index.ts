import {
  GET_FLIGHT
} from "../actionTypes"

import { flightActions, flightState } from "../types"

const initialState : flightState = {
     results: {}
  };


  export default (state = initialState, action:flightActions)=> {
    switch (action.type) {
      case GET_FLIGHT:
        return {
          ...state,
          results: action.payload
        };
      default:
      return {
        ...state,
      };
    }
  }