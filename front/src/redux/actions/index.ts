import axios from "axios"
import { GET_FLIGHT } from "../actionTypes"

export function getFlight(payload: any) {
    console.log(payload)

    

    return async function (dispatch: any) {

        try {
            const json = await axios.get(`http://localhost:3001/?inputOrigin=${payload.originCity}&inputDestiny=${payload.destinyCity}&inputOriginDate=${payload.departureDate}`)
            // const json = await axios.get('http://localhost:3001/?inputOrigin=FTE&inputDestiny=AEP&inputOriginDate=2021-12-29')

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