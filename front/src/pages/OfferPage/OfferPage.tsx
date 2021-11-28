import styles from "./OfferPage.module.scss";
import info from "./OfferJson";

export default function OfferPage(): JSX.Element {
  return (
    <div>
      {info.map((el): JSX.Element => {
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

            {el.offers.map((s): JSX.Element => {
              return (
                <div>
                  <h1>{`${s.currency} ${s.price}`}</h1>
                  <h1>SEGMENTOS:</h1>
                  {s.departure.transfers.map((j): JSX.Element => {
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
              {el.offers.map((s): JSX.Element => {
                return (
                  <div>
                    <h1>Origen:{s.return?.origin.city}</h1>
                    <h1>{s.return?.origin.airport}</h1>
                    <h1>Destino:{s.return?.destiny.city}</h1>
                    <h1>{s.return?.destiny.airport}</h1>
                    <h1>SEGMENTOS:</h1>
                    {s.return?.transfers.map((j): JSX.Element => {
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
