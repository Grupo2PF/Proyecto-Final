import styles from "./OfferPage.module.scss";
import info from "./OfferJson";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

type transfers = {
  id?: string;
  origin: string;
  destination: string;
  departure: string;
  arrive: string;
  airline: string;
  flightNumber: string;
};

type offer = {
  id: string;
  price: string;
  currency: string;
  airline: string;
  departure: {
    id: string;
    origin: {
      city: string;
      airport: string;
      date: string;
    };
    destiny: {
      city: string;
      airport: string;
    };
    transfers: Array<transfers>;
  };
  return?: {
    id: string;
    origin: {
      city: string;
      airport: string;
      date: string;
    };
    destiny: {
      city: string;
      airport: string;
    };
    transfers: Array<transfers>;
  };
};

type Back = {
  mode: string;
  class: string;
  origin: {
    city: string;
    airport: string;
  };
  destination: {
    city: string;
    airport: string;
  };
  offers: Array<offer>;
};

export default function OfferPage(): JSX.Element {

  const dispatch = useDispatch();
  
  const response :any = useSelector((state: any) => state.allFlight);
  console.log(" soy el response del useSelector ")
  console.log(response);
  
  // useEffect(() => {
  //   dispatch(response);
  // }, [response]);

// const info1 = Array < Back > ();
  return (
    <div>
      <br/>
      <br/>
      <br/>
      <br/>
      
      <div>
       <p> {response.class}</p>
       <p>{response.mode}</p>
       <p>{response.origin.city}</p>
       <p>{response.origin.airport}</p>
       <p>{response.destination.city}</p>
       <p>{response.destination.airport}</p>
      </div>

      <div>
        {response.offers.map((item: any) => (
          <div>
            <div>
              {item.price}
              {item.currency}
              {item.airline}
              {item.transfers.map((item: any) => (
                <div>
                  {item.origin}
                  {item.destination}
                  {item.departure}
                  {item.arrive}
                  {item.airline}
                  {item.flightNumber}
                  <br/>
                  </div>
              ))}
              </div>
              </div>
        ))}

                </div>

      
    </div>
  );
}
