import axios from "axios";
import { GET_FLIGHT, GET_SEATS, SET_LOADING } from "../actionTypes";

export function getFlight(payload: any) {

  return async function (dispatch: any) {
    try {
      if (payload.returnDate !== "") {
        const json = await axios.get(
          `http://localhost:3001/search?origin=${payload.originCity}&destination=${payload.destinyCity}&dDate=${payload.departureDate}&rDate=${payload.departureDate}&adults=${payload.adult}&childs=${payload.kid}&baby=${payload.baby}&cabin=economy`
        );

        return dispatch({
          type: GET_FLIGHT,
          payload: (json.data)
        });
      } else {
        const json = await axios.get(
          `http://localhost:3001/search?origin=${payload.originCity}&destination=${payload.destinyCity}&dDate=${payload.departureDate}&adults=${payload.adult}&childs=${payload.kid}&baby=${payload.baby}&cabin=economy`
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

  export function setLoading(payload: boolean) {
    return async function (dispatch: any) {
      return dispatch({
        type: SET_LOADING,
        payload: payload
      });
    }
  }




    export function getSeats(payload: any) {
      return async function (dispatch: any) {
        try { 
          const info = await axios.get(`http://localhost:3001/${payload}/seats`);
          return dispatch({
            type: GET_SEATS,
            payload: info.data,
          });
        } catch (err) {
          console.log(err);
        }
      };
    }