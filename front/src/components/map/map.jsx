import React from "react"
import { useSelector } from "react-redux";
import GoogleMaps from "simple-react-google-maps"

export default function Maps() {

    const ubicacion = useSelector((state) => state.allFlight);

return (
    console.log(ubicacion),
    <div>
    <GoogleMaps 
    apiKey = {"AIzaSyDMn0hAA8XSluTktdHWDR21UYLMxl_2e7U"}
    style={{height: "250px", width: "700px"}}
    zoom = {1.3}
    center= {{
        lat: 10,
        lng: 0
    }}
    markers={[
        {lat: ubicacion.origin.latO, lng: ubicacion.origin.lngO},
        {lat: ubicacion.destination.latD, lng: ubicacion.destination.lngD},
    ]}
    /></div>
)
}
