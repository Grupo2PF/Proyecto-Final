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

const info = (): Array<Back> => {
  return [
    {
      mode: "roundtrip",
      class: "economy",
      origin: {
        city: "El Calafate",
        airport: "El Calafate International Airport",
      },
      destination: {
        city: "Buenos Aires",
        airport: "Jorge Newbery Airfield",
      },
      offers: [
        {
          id: "off_0000ADpq8U1zYaMuuQY06G",
          price: "535.50",
          currency: "USD",
          airline: "Aerolineas Argentinas",
          departure: {
            id: "ose_0000ADpq8TZI2Bj18wC1fE",
            origin: {
              city: "El Calafate",
              airport: "El Calafate International Airport",
              date: "2021-12-29T10:45:00",
            },
            destiny: {
              city: "Buenos Aires",
              airport: "Jorge Newbery Airfield",
            },
            transfers: [
              {
                origin: "El Calafate",
                destination: "Buenos Aires",
                departure: "2021-12-29T10:45:00",
                arrive: "2021-12-29T13:40:00",
                airline: "Aerasds",
                flightNumber: "11237",
              },
              {
                origin: "El Calafate",
                destination: "Buenos Aires",
                departure: "2021-12-29T10:45:00",
                arrive: "2021-12-29T13:40:00",
                airline: "Aerolineas Argentinas",
                flightNumber: "1867",
              }
            ],
          },
          return: {
            id: "ose_0000ADpq8TZI2Bj18wC1fF",
            origin: {
              city: "Buenos Aires",
              airport: "Jorge Newbery Airfield",
              date: "2022-01-05T04:30:00",
            },
            destiny: {
              city: "El Calafate",
              airport: "El Calafate International Airport",
            },
            transfers: [
              {
                id: "ost_0000ADpq8TZe0s0bA2MJDW",
                origin: "Buenos Aires",
                destination: "Ushuaia",
                departure: "2022-01-05T04:30:00",
                arrive: "2022-01-05T08:05:00",
                airline: "Aerolineas Argentinas",
                flightNumber: "1882",
              },
              {
                id: "ost_0000ADpq8TZe0s0bA2MJDW",
                origin: "Ushuaia",
                destination: "El Calafate",
                departure: "2022-01-05T10:30:00",
                arrive: "2022-01-05T15:05:00",
                airline: "LAN",
                flightNumber: "2382",
              },
            ],
          },
        },
      ],
    },
  ];
};

export default info();
