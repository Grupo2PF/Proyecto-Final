import styles from "./OfferPage.module.scss";
import info from "./OfferJson";
import { useSelector } from "react-redux";


export default function OfferPage(Back:object): JSX.Element {

    const response = useSelector((state: any) => state.allFlight);
    
    
    // const info1 = Array < Back > ();
      return (
        <div>
          {response?.map((el:any): any => {
            return (
              <div className={styles.offerPageContainer}>
                <div>
                  <h1>IDA</h1>
                  <h1>Origen:{el.origin.city}</h1>
                  <h1>{el.origin.airport}</h1>
                  <h1>Destino:{el.destination.city}</h1>
                  <h1>{el.destination.airport}</h1>
                  <h1>Clase:{el.class}</h1>
                </div>
    
                {el.offers.map((s:any): JSX.Element => {
                  return (
                    <div>
                      <h1>{`${s.currency} ${s.price}`}</h1>
                      <h1>SEGMENTOS:</h1>
                      {s.departure.transfers.map((j:any): JSX.Element => {
                        return (
                          <div>
                            <h1>{j.origin} - {j.destination}</h1>
                            <h1>{j.airline}</h1>
                            <h1>Vuelo Nro: {j.flightNumber}</h1>
                            <h1>Salida:{j.departure}</h1>
                            <h1>Llegada:{j.arrive}</h1>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
    
                <div>
                  <br />
                  <br />
                  <br />
                  <h1>VUELTA</h1>
                  {el.offers.map((s:any): JSX.Element => {
                    return (
                      <div>
                        <h1>Origen:{s.return?.origin.city}</h1>
                        <h1>{s.return?.origin.airport}</h1>
                        <h1>Destino:{s.return?.destiny.city}</h1>
                        <h1>{s.return?.destiny.airport}</h1>
                        <h1>SEGMENTOS:</h1>
                        {s.return?.transfers.map((j:any): JSX.Element => {
                          return (
                            <div>
                              <h1>{j.origin} - {j.destination}</h1>
                              <h1>{j.airline}</h1>
                              <h1>Vuelo Nro: {j.flightNumber}</h1>
                              <h1>Salida:{j.departure}</h1>
                              <h1>Llegada:{j.arrive}</h1>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      );
    }
    