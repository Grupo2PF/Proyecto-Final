import axios from "axios"
import { GET_FLIGHT } from "../actionTypes"

export function getFlight(payload: any) {
    console.log("payload de la action")
    console.log(payload)

    

    return async function (dispatch: any) {

        try {
            const json = await axios.get(`http://localhost:3001/search?origin=${payload.originCity}&destination=${payload.destinyCity}&dDate=${payload.departureDate}&adults=${payload.adult}&childs=${payload.kid}&baby=${payload.baby}&cabin=economy`)
            console.log(json)
            return dispatch({
                type: GET_FLIGHT,
                payload: json.data

            });
        } catch (err) {
            console.log(err)
        }
    }
}