import { useHistory, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./seatsPage.module.scss";
import OtherBox from "./OtherBox";
import logo from "../../assets/logo/dev-sky-black-logo.svg";
import seatsDefault from "./seatsDefault";
import { getSeats } from "../../redux/actions";
import GoHomeButton from "../../components/GoHomeButton/GoHomeButton";

export default function SeatsPage() {
  const [input, setInput] = useState([]);
  const [inputSegundo, setInputSegundo] = useState([]);
  const [inputTres, setInputTres] = useState([]);
  const [inputCuatro, setInputCuatro] = useState([]);

  const { state } = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const offerId = state.offer.offers;

  useEffect(() => {
    dispatch(getSeats(offerId));
  }, [dispatch, offerId]);

  const pax = state.passengers;
  const seats = useSelector((state) => state.allSeats);
  const firstOprtionSeats = seats.seatsByFlight;
  console.log(seats);
  const { otherDefault } = seatsDefault;
  const { seatsByFlight } = otherDefault;
  console.log(seatsByFlight);

  const finalSeats = firstOprtionSeats ? firstOprtionSeats : seatsByFlight;

  const handleCheckIda = (e) => {
    let checked = e.target.checked;
    if (checked && input.length < pax.length) {
      setInput([...input, e.target.value]);
      if (input.length === pax.length - 1)
        return alert(
          "ya seleccionaste todos los asientos que necesitas para este vuelo, puedes continuar con el siguiente"
        );
      else alert(`asiento ${e.target.value} seleccionado exitosamente`);
    } else {
      alert(
        "ya seleccionaste todos los asientos, si quieres volver a elejirlos o cambiarlos antes de confirmar, puedes actualizar el navegador y elejirlos nuevamente"
      );
      console.log(input);
    }
  };

  const handleCheckSegundo = (e) => {
    let checked = e.target.checked;
    if (checked && inputSegundo.length < pax.length) {
      setInputSegundo([...inputSegundo, e.target.value]);
      if (inputSegundo.length === pax.length - 1)
        return alert(
          "ya seleccionaste todos los asientos que necesitas para este vuelo, puedes continuar con el siguiente"
        );
      else alert(`asiento ${e.target.value} seleccionado exitosamente`);
    } else {
      alert(
        "ya seleccionaste todos los asientos, si quieres volver a elejirlos o cambiarlos antes de confirmar, puedes actualizar el navegador y elejirlos nuevamente"
      );
      console.log(input);
    }
  };

  const handleCheckTercero = (e) => {
    let checked = e.target.checked;
    if (checked && inputTres.length < pax.length) {
      setInputTres([...inputTres, e.target.value]);
      if (inputTres.length === pax.length - 1)
        return alert(
          "ya seleccionaste todos los asientos que necesitas para este vuelo, puedes continuar con el siguiente"
        );
      else alert(`asiento ${e.target.value} seleccionado exitosamente`);
    } else {
      alert(
        "ya seleccionaste todos los asientos, si quieres volver a elejirlos o cambiarlos antes de confirmar, puedes actualizar el navegador y elejirlos nuevamente"
      );
      console.log(input);
    }
  };

  const handleCheckCuarto = (e) => {
    let checked = e.target.checked;
    if (checked && inputCuatro.length < pax.length) {
      setInputCuatro([...inputCuatro, e.target.value]);
      if (inputCuatro.length === pax.length - 1)
        return alert(
          "ya seleccionaste todos los asientos que necesitas para este vuelo, puedes continuar con el siguiente"
        );
      else alert(`asiento ${e.target.value} seleccionado exitosamente`);
    } else {
      alert(
        "ya seleccionaste todos los asientos, si quieres volver a elejirlos o cambiarlos antes de confirmar, puedes actualizar el navegador y elejirlos nuevamente"
      );
      console.log(input);
    }
  };

  const actualSeats = [...input, ...inputSegundo, ...inputTres, ...inputCuatro];
  console.log(actualSeats);
  const allSeats = [
    [...input],
    [...inputSegundo],
    [...inputTres],
    [...inputCuatro],
  ];

  const handleSubmit = () => {
    console.log(input);
    console.log(allSeatsLimit);
    if (actualSeats.length < allSeatsLimit)
      return alert("faltan asientos por elegir");
    if (actualSeats.length > allSeatsLimit)
      return alert("ya seleccionaste todos los asientos");
    else if (actualSeats.length === allSeatsLimit)
      return history.push({
        pathname: "/pay",
        state: { ...state, allSeats },
      });
  };
  console.log(finalSeats);

  const flightsId = finalSeats.map((e) => e.id);
  console.log(flightsId);

  const allSeatsLimit = pax.length * finalSeats.length;
  console.log(allSeatsLimit);

  const firstFlight = finalSeats[0];
  const secondFlight = finalSeats[1];
  const tirdFlight = finalSeats[2];
  const fourtFlight = finalSeats[3];

  console.log(firstFlight);

  function renderAviones() {
    const oneFlight = (
      <div>
        <div className={styles.rotulo}>
          <img src={logo} alt="logo" className={styles.logo} display="center" />
          <div>
            Elije los <b>{pax.length} asientos</b> del vuelo {firstFlight.id}
          </div>
        </div>
        {firstFlight.seatsInfo[0].map((e) => (
          <div className={styles.fila}>
            <h1>II</h1>
            {e.map((columna) => (
              <div className={styles.columna}>
                {columna.map((x) =>
                  x.numberAndLetter ? (
                    <div>
                      {x.available.length === 0 ? (
                        <div>
                          <input
                            type="checkbox"
                            name="libre"
                            title="ckeckida"
                            id={x.numberAndLetter}
                            value={x.numberAndLetter}
                            disabled={input.length === pax.length}
                            onChange={(e) => handleCheckIda(e)}
                          />
                        </div>
                      ) : (
                        <div>
                          <input
                            type="checkbox"
                            name="ocupado"
                            value="ocupado"
                            disabled
                          ></input>
                        </div>
                      )}{" "}
                      <div className={styles.numbLett}>{x.numberAndLetter}</div>
                    </div>
                  ) : (
                    <OtherBox className={styles.other} type={x.type} />
                  )
                )}
              </div>
            ))}

            <h1>II</h1>
          </div>
        ))}
      </div>
    );

    const dobleFlight = secondFlight ? (
      <div>
        <div className={styles.rotulo}>
          <img src={logo} alt="logo" className={styles.logo} display="center" />
          <div>
            Elije los <b>{pax.length} asientos</b> del vuelo {secondFlight.id}
          </div>
        </div>
        {secondFlight.seatsInfo[0].map((e) => (
          <div className={styles.fila}>
            <h1>II</h1>
            {e.map((columna) => (
              <div className={styles.columna}>
                {columna.map((x) =>
                  x.numberAndLetter ? (
                    <div>
                      {x.available.length === 0 ? (
                        <div>
                          <input
                            type="checkbox"
                            name="libre"
                            id={x.numberAndLetter}
                            value={x.numberAndLetter}
                            disabled={inputSegundo.length === pax.length}
                            onChange={(e) => handleCheckSegundo(e)}
                          />
                        </div>
                      ) : (
                        <div>
                          <input
                            type="checkbox"
                            name="ocupado"
                            value="ocupado"
                            disabled
                          ></input>
                        </div>
                      )}{" "}
                      <div className={styles.numbLett}>{x.numberAndLetter}</div>
                    </div>
                  ) : (
                    <OtherBox className={styles.other} type={x.type} />
                  )
                )}
              </div>
            ))}

            <h1>II</h1>
          </div>
        ))}
      </div>
    ) : null;

    const tripleFlight = tirdFlight ? (
      <div>
        <div className={styles.rotulo}>
          <img src={logo} alt="logo" className={styles.logo} display="center" />
          <div>
            Elije los <b>{pax.length} asientos</b> del vuelo {tirdFlight.id}
          </div>
        </div>
        {tirdFlight.seatsInfo[0].map((e) => (
          <div className={styles.fila}>
            <h1>II</h1>
            {e.map((columna) => (
              <div className={styles.columna}>
                {columna.map((x) =>
                  x.numberAndLetter ? (
                    <div>
                      {x.available.length === 0 ? (
                        <div>
                          <input
                            type="checkbox"
                            name="libre"
                            id={x.numberAndLetter}
                            value={x.numberAndLetter}
                            disabled={inputTres.length === pax.length}
                            onChange={(e) => handleCheckTercero(e)}
                          />
                        </div>
                      ) : (
                        <div>
                          <input
                            type="checkbox"
                            name="ocupado"
                            value="ocupado"
                            disabled
                          ></input>
                        </div>
                      )}{" "}
                      <div className={styles.numbLett}>{x.numberAndLetter}</div>
                    </div>
                  ) : (
                    <OtherBox className={styles.other} type={x.type} />
                  )
                )}
              </div>
            ))}

            <h1>II</h1>
          </div>
        ))}
      </div>
    ) : null;

    const lastFlight = fourtFlight ? (
      <div>
        <div className={styles.rotulo}>
          <img src={logo} alt="logo" className={styles.logo} display="center" />
          <div>
            Elije los <b>{pax.length} asientos</b> del vuelo {fourtFlight.id}
          </div>
        </div>
        {fourtFlight.seatsInfo[0].map((e) => (
          <div className={styles.fila}>
            <h1>II</h1>
            {e.map((columna) => (
              <div className={styles.columna}>
                {columna.map((x) =>
                  x.numberAndLetter ? (
                    <div>
                      {x.available.length === 0 ? (
                        <div>
                          <input
                            type="checkbox"
                            name="libre"
                            id={x.numberAndLetter}
                            value={x.numberAndLetter}
                            disabled={inputCuatro.length === pax.length}
                            onChange={(e) => handleCheckCuarto(e)}
                          />
                        </div>
                      ) : (
                        <div>
                          <input
                            type="checkbox"
                            name="ocupado"
                            value="ocupado"
                            disabled
                          ></input>
                        </div>
                      )}{" "}
                      <div className={styles.numbLett}>{x.numberAndLetter}</div>
                    </div>
                  ) : (
                    <OtherBox className={styles.other} type={x.type} />
                  )
                )}
              </div>
            ))}

            <h1>II</h1>
          </div>
        ))}
      </div>
    ) : null;
    
    return (
      <div className={styles.allSeats}>
        <GoHomeButton />
        <div className={styles.container}>
          <div className={styles.oneCard}></div>
          <div>{oneFlight}</div>
          <div>{dobleFlight ? dobleFlight : null}</div>
          <div>{tripleFlight ? tripleFlight : null}</div>
          <div>{lastFlight ? lastFlight : null}</div>

          <div className={styles.buttondiv}></div>
          <button
            className={styles.buttonSubmit}
            type="submit"
            onClick={() => handleSubmit()}
          >
            Confirmar asientos
          </button>
        </div>
      </div>
    );
  }

  return renderAviones();
}
