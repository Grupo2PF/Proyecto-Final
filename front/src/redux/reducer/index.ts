import { GET_FLIGHT } from "../actionTypes";

const initialState:object = {
  allFlight:{},
  };

  type Action = { 
    type: string,
    payload: object|null
  
  };
 
  export default function rootReducer(state = initialState, action:Action) {
    switch (action.type) {
      case GET_FLIGHT:
        return {
          ...state,
          allFlight: action.payload
        }
        
      default:
        return state;
    }

      
  }