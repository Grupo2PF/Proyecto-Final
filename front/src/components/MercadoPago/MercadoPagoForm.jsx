import React, { useState } from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import useMercadoPago from "./useMercadoPago";
import styles from "./MercadoPagoForm.module.scss";
import { IoIosContact } from "react-icons/io";
import { MdOutlinePassword, MdPayments } from "react-icons/md";
import { FiAtSign } from "react-icons/fi";
import { HiOutlineIdentification, HiOutlineDocumentText } from "react-icons/hi";
import { BsCalendar3, BsCalendarDate, BsCreditCard } from "react-icons/bs";
import { AiOutlineBank } from "react-icons/ai";
import {
  cardExpirationMonthValidation,
  cardExpirationYearValidation,
  cardholderEmailValidation,
  cardholderNameValidation,
  cardNumberValidation,
  cvcValidation,
  identificationNumberValidation,
  validateFormPayment,
} from "./Validations";
import GoHomeButton from "../GoHomeButton/GoHomeButton";

const INITIAL_STATE = {
  cvc: "",
  cardExpirationMonth: "",
  cardExpirationYear: "",
  focus: "cardNumber",
  cardholderName: "",
  cardNumber: "",
  issuer: "",
  cardholderEmail: "",
  identificationNumber: "",
};

export default function MercadoPagoForm(props) {
  const [state, setState] = useState(INITIAL_STATE);
  const resultPayment = useMercadoPago();

  // En props esta toda la información necesaria
  // puedes acceder a las props del vuelo mediante props.offer
  // puedes acceder a las props de los pasajeros mediante props.passengers
  console.log("Data completa: ", props);
  console.log("Data del vuelo: ", props.offer);
  console.log("Data de los pasajeros: ", props.passengers);

  const [inputError, setInputError] = useState({
    cvc: [false, ""],
    cardExpirationMonth: [false, ""],
    cardExpirationYear: [false, ""],
    cardholderName: [false, ""],
    cardNumber: [false, ""],
    cardholderEmail: [false, ""],
    identificationNumber: [false, ""],
  });

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };

  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.dataset.name || e.target.name });
  };

  const resetForm = () => {
    setState({
      cvc: "",
      cardExpirationMonth: "",
      cardExpirationYear: "",
      focus: "cardNumber",
      cardholderName: "",
      cardNumber: "",
      issuer: "",
      cardholderEmail: "",
      identificationNumber: "",
    });
    setInputError({
      cvc: [false, ""],
      cardExpirationMonth: [false, ""],
      cardExpirationYear: [false, ""],
      cardholderName: [false, ""],
      cardNumber: [false, ""],
      cardholderEmail: [false, ""],
      identificationNumber: [false, ""],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFormPayment(state, inputError, setInputError)) {
      resetForm();
      document.form1.reset();
    }
  };

  return (
    <div className={styles.paymentContainer}>
      <GoHomeButton />
      <div className={styles.paymentCard}>
        <h1>Payment Process</h1>
        <Card
          cvc={state.cvc}
          expiry={state.cardExpirationMonth + state.cardExpirationYear}
          name={state.cardholderName}
          number={state.cardNumber}
          focused={state.focus}
          brand={state.issuer}
        />
      </div>

      <div></div>

      <form
        className={styles.paymentForm}
        onSubmit={(e) => handleSubmit(e)}
        id="form-checkout"
        name="form1"
      >
        <div className={styles.paymentFormDiv}>
          <BsCreditCard
            className={
              inputError.cardNumber[0]
                ? styles.paymentFormDivIcon +
                  " " +
                  styles.paymentFormDivIconError
                : styles.paymentFormDivIcon
            }
          />
          <input
            maxLength={16}
            className={styles.paymentFormInput}
            type="tel"
            name="cardNumber"
            id="form-checkout__cardNumber"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyUp={(e) => cardNumberValidation(e, inputError, setInputError)}
          />
          {inputError.cardNumber[0] && (
            <span className={styles.paymentFormDivErrorMessage}>
              {inputError.cardNumber[1]}
            </span>
          )}
        </div>
        <div className={styles.paymentFormDiv}>
          <IoIosContact
            className={
              inputError.cardholderName[0]
                ? styles.paymentFormDivIcon +
                  " " +
                  styles.paymentFormDivIconError
                : styles.paymentFormDivIcon
            }
          />
          <input
            className={styles.paymentFormInput}
            maxLength={40}
            type="text"
            name="cardholderName"
            id="form-checkout__cardholderName"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyUp={(e) =>
              cardholderNameValidation(e, inputError, setInputError)
            }
          />
          {inputError.cardholderName[0] && (
            <span className={styles.paymentFormDivErrorMessage}>
              {inputError.cardholderName[1]}
            </span>
          )}
        </div>
        <div className={styles.paymentFormDatos}>
          <div className={styles.paymentFormDatosInputs}>
            <div className={styles.paymentFormDiv}>
              <BsCalendarDate
                className={
                  inputError.cardExpirationMonth[0]
                    ? styles.paymentFormDivIcon +
                      " " +
                      styles.paymentFormDivIconError
                    : styles.paymentFormDivIcon
                }
              />
              <input
                maxLength={2}
                className={styles.paymentFormInput}
                type="tel"
                name="cardExpirationMonth"
                id="form-checkout__cardExpirationMonth"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyUp={(e) =>
                  cardExpirationMonthValidation(e, inputError, setInputError)
                }
              />
            </div>
            <div className={styles.paymentFormDiv}>
              <BsCalendar3
                className={
                  inputError.cardExpirationYear[0]
                    ? styles.paymentFormDivIcon +
                      " " +
                      styles.paymentFormDivIconError
                    : styles.paymentFormDivIcon
                }
              />
              <input
                maxLength={2}
                className={styles.paymentFormInput}
                type="tel"
                name="cardExpirationYear"
                id="form-checkout__cardExpirationYear"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyUp={(e) =>
                  cardExpirationYearValidation(e, inputError, setInputError)
                }
              />
            </div>
            <div className={styles.paymentFormDiv}>
              <MdOutlinePassword
                className={
                  inputError.cvc[0]
                    ? styles.paymentFormDivIcon +
                      " " +
                      styles.paymentFormDivIconError
                    : styles.paymentFormDivIcon
                }
              />
              <input
                maxLength={3}
                className={styles.paymentFormInput}
                type="tel"
                name="cvc"
                id="form-checkout__securityCode"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onKeyUp={(e) => cvcValidation(e, inputError, setInputError)}
              />
            </div>
          </div>
          <div className={styles.paymentFormDatosErrors}>
            {inputError.cardExpirationYear[0] && (
              <span className={styles.paymentFormDivErrorMessage}>
                {inputError.cardExpirationYear[1]}
              </span>
            )}
            {inputError.cvc[0] && (
              <span className={styles.paymentFormDivErrorMessage}>
                {inputError.cvc[1]}
              </span>
            )}
            {inputError.cardExpirationMonth[0] && (
              <span className={styles.paymentFormDivErrorMessage}>
                {inputError.cardExpirationMonth[1]}
              </span>
            )}
          </div>
        </div>
        <div className={styles.paymentFormDiv}>
          <FiAtSign
            className={
              inputError.cardholderEmail[0]
                ? styles.paymentFormDivIcon +
                  " " +
                  styles.paymentFormDivIconError
                : styles.paymentFormDivIcon
            }
          />
          <input
            className={styles.paymentFormInput}
            type="email"
            name="cardholderEmail"
            id="form-checkout__cardholderEmail"
            onFocus={handleInputFocus}
            onChange={handleInputChange}
            onKeyUp={(e) =>
              cardholderEmailValidation(e, inputError, setInputError)
            }
          />
          {inputError.cardholderEmail[0] && (
            <span className={styles.paymentFormDivErrorMessage}>
              {inputError.cardholderEmail[1]}
            </span>
          )}
        </div>
        <div className={styles.paymentSelectDiv}>
          <AiOutlineBank className={styles.paymentFormDivIcon} />
          <select
            className={styles.paymentSelect}
            name="issuer"
            id="form-checkout__issuer"
            on
          ></select>
        </div>
        <div className={styles.paymentSelectDiv}>
          <HiOutlineDocumentText className={styles.paymentFormDivIcon} />
          <select
            className={styles.paymentSelect}
            name="identificationType"
            id="form-checkout__identificationType"
          ></select>
        </div>
        <div className={styles.paymentFormDiv}>
          <HiOutlineIdentification
            className={
              inputError.identificationNumber[0]
                ? styles.paymentFormDivIcon +
                  " " +
                  styles.paymentFormDivIconError
                : styles.paymentFormDivIcon
            }
          />
          <input
            maxLength={10}
            className={styles.paymentFormInput}
            type="text"
            name="identificationNumber"
            id="form-checkout__identificationNumber"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyUp={(e) =>
              identificationNumberValidation(e, inputError, setInputError)
            }
          />
          {inputError.identificationNumber[0] && (
            <span className={styles.paymentFormDivErrorMessage}>
              {inputError.identificationNumber[1]}
            </span>
          )}
        </div>
        <div className={styles.paymentSelectDiv}>
          <MdPayments className={styles.paymentFormDivIcon} />
          <select
            className={styles.paymentSelect}
            name="installments"
            id="form-checkout__installments"
          ></select>
        </div>
        <div className={styles.paymentFormDivButton}>
          <button type="submit" id="form-checkout__submit">
            Pagar
          </button>
        </div>
        {/* <progress value="0" className={styles.progressBar}>
          Cargando...
        </progress> */}
      </form>
      {resultPayment && <p>{JSON.stringify(resultPayment)}</p>}
    </div>
  );
}
