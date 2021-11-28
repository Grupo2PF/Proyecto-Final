import styles from "./OfferPage.module.scss";
import info from "./OfferJson";

export default function OfferPage(): JSX.Element {
  return (
    <div>
      {info.map((el): JSX.Element => {
        return (
          <div className={styles.offerPageContainer}>
            <div>
              <h1>{el.origin.city}</h1>
              <h1>{el.destination.city}</h1>
            </div>

            {el.offers.map((s): JSX.Element => {
                return (
                <div>
                    
                    {s.departure.transfers.map((j): JSX.Element =>{
                        return (
                            <div>
                                <h1>{j.airline}</h1>
                                <h1>{j.flightNumber}</h1>
                            </div>
                        )
                    })}

                </div>
            )})}

            </div>
        );
      })}
    </div>
  );
}
