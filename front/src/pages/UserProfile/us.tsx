import img from "../../pages/AboutUs/photo/fotoEsteban.jpeg";

type Datos = {
  id: string;
  name: string;
  apellido: string;
  email: string;
  phone: string;
  dni: string;
  bDate: string;
  img: string;
  fav: Array<object>;
  tik: Array<object>;
};

const datos = (): Array<Datos> => {
  return [
    {
      img: `${img}`,
      id: "wssddsds",
      name: "Esteban",
      apellido: "Luna",
      email: "estebanlunacl@gmail.com",
      phone: "454545454",
      dni: "45454545654",
      bDate: "2001-05-30",
      fav: [
        {
          name: "Bali",
        },
      ],
      tik: [
        {
          originCity: "Bali",
          destinyCity: "Belgica",
          departureDate: "2021-12-30",
          returnDate: "2022-03-02",
          journeyType: "2",
          class: "Economy",
        },
      ],
    },
  ];
};

export default datos();
