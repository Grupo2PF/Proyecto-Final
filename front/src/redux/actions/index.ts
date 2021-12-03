import axios from "axios";
import { GET_FLIGHT } from "../actionTypes";

export function getFlight(payload: any) {
  console.log("info desde el searchbar hacia la action");
  console.log(payload);

  return async function (dispatch: any) {
    try {
      if (payload.returnDate !== "") {
        const json = await axios.get(
          `http://localhost:3001/search?origin=${payload.originCity}&destination=${payload.destinyCity}&dDate=${payload.departureDate}&rDate=${payload.departureDate}&adults=${payload.adult}&childs=${payload.kid}&baby=${payload.baby}&cabin=economy`
        );
        console.log("respuesta de la API para IDA Y VUELTA en el front")
        console.log(json);
        return dispatch({
          type: GET_FLIGHT,
          payload: json.data,
        });
      } else {
        const json = await axios.get(
          `http://localhost:3001/search?origin=${payload.originCity}&destination=${payload.destinyCity}&dDate=${payload.departureDate}&adults=${payload.adult}&childs=${payload.kid}&baby=${payload.baby}&cabin=economy`
        );
        console.log("soy la respuesta de la api")
        console.log(json.data);
        return dispatch({
          type: GET_FLIGHT,
          payload: json.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
}
