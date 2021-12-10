import axios from "axios";
import { GET_FLIGHT, GET_SEATS, SET_LOADING, GET_FLIGHT_URL, RESET, GET_PAY } from "../actionTypes";

export function getFlight(payload: any) {

  return async function (dispatch: any) {

    try {
      if (payload.journeyType === true) {
        const json = await axios.get(
          `http://localhost:3001/search?origin=${payload.originCity}&destination=${payload.destinyCity}&dDate=${payload.departureDate}&rDate=${payload.returnDate}&adults=${payload.adult}&childs=${payload.kid}&baby=${payload.baby}&cabin=${payload.class}`
        );

        return dispatch({
          type: GET_FLIGHT,
          payload: (json.data)
        });
      } else { console.log(payload)
        const json = await axios.get(
          `http://localhost:3001/search?origin=${payload.originCity}&destination=${payload.destinyCity}&dDate=${payload.departureDate}&adults=${payload.adult}&childs=${payload.kid}&baby=${payload.baby}&cabin=${payload.class}`
        );
        return dispatch({
          type: GET_FLIGHT,
          payload: json.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

export function getFlightUrl(payload: any) {
  return async function (dispatch: any) {
    
    try {
      const json = await axios.get(
        `http://localhost:3001/search${payload}`
      );
      return dispatch({
        type: GET_FLIGHT_URL,
        payload: json.data,
      });
    } catch (err) {
      console.log(err)
      return dispatch({
        type: GET_FLIGHT_URL,
        payload: {mensaje:err}
    })
  }
}
}


  export function setLoading(payload: boolean) {
    console.log(payload);
    return async function (dispatch: any) {
      return dispatch({
        type: SET_LOADING,
        payload: payload
      });
    }
  }

  export function getPay(payload: any) {
    console.log(payload);
    return async function (dispatch: any) {
      return dispatch({
        type: GET_PAY,
        payload: payload
      });
    }
  }

    export function getSeats(payload: any) {
      return async function (dispatch: any) {
        try { 
          console.log(payload);
          const info = await axios.get(`http://localhost:3001/${payload}/seats`);
          console.log("respuesta de la api");
          console.log(info.data);
          return dispatch({
            type: GET_SEATS,
            payload: info.data,
          });
        } catch (err) {
          console.log(err);
        }
      };
    }

    export function resetState() {
      return async function (dispatch: any) {
          return dispatch({
            type: RESET,
          });
        }
    }