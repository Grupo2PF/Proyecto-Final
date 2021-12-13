import React, { useState } from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import useMercadoPago from "../../hooks/useMercadoPago";
import styles from "./MercadoPagoForm.module.scss";
import { IoIosContact } from "react-icons/io";
import { MdOutlinePassword, MdPayments } from "react-icons/md";
import { FiAtSign } from "react-icons/fi";
import { HiOutlineIdentification, HiOutlineDocumentText } from "react-icons/hi";
import {BsCalendar3, BsCalendarDate, BsCreditCard} from "react-icons/bs";
import { AiOutlineBank } from "react-icons/ai";
import {useHistory} from "react-router-dom";

const INITIAL_STATE = {
  cvc: "",
  cardExpirationMonth: "",
  cardExpirationYear: "",
  focus: "cardNumber",
  cardholderName: "",
  cardNumber: "",
  issuer: "",
};

export default function MercadoPagoForm() {
  const [state, setState] = useState(INITIAL_STATE);
  const resultPayment = useMercadoPago();
  const history = useHistory();

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.dataset.name || e.target.name]: e.target.value,
    });
  };

  const handleInputFocus = (e) => {
    setState({ ...state, focus: e.target.dataset.name || e.target.name });
  };

  return (
      <div className={styles.payPageContainer}>
        <div className={styles.paymentContainer}>
          <div className={styles.paymentCard}>
            {/* Boton de volver al home */}
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

          {/* Numero de la tarjeta */}
          <form id="form-checkout" className={styles.paymentForm}>
            <div className={styles.paymentFormDiv}>
              <BsCreditCard className={styles.paymentFormDivIcon} />
              <input
                  className={styles.paymentFormInput}
                  maxLength={16}
                  type="tel"
                  name="cardNumber"
                  id="form-checkout__cardNumber"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
              />
            </div>

            {/*  Nombre del titular */}
            <div className={styles.paymentFormDiv}>
              <IoIosContact className={styles.paymentFormDivIcon} />
              <input
                  className={styles.paymentFormInput}
                  maxLength={40}
                  type="text"
                  name="cardholderName"
                  id="form-checkout__cardholderName"
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
              />
            </div>

            {/* Mes y año de expiracion y cvc */}
            <div className={styles.paymentFormDatos}>
              {/* Mes de expiracion */}
              <div className={styles.paymentFormDiv}>
                <BsCalendarDate className={styles.paymentFormDivIcon} />
                <input
                    maxLength={2}
                    className={styles.paymentFormInput}
                    type="tel"
                    name="cardExpirationMonth"
                    id="form-checkout__cardExpirationMonth"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
              </div>

              {/* Año de expiracion */}
              <div className={styles.paymentFormDiv}>
                <BsCalendar3 className={styles.paymentFormDivIcon} />
                <input
                    maxLength={2}
                    className={styles.paymentFormInput}
                    type="tel"
                    name="cardExpirationYear"
                    id="form-checkout__cardExpirationYear"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
              </div>

              {/* Codigo de seguridad */}
              <div className={styles.paymentFormDiv}>
                <MdOutlinePassword className={styles.paymentFormDivIcon} />
                <input
                    maxLength={3}
                    className={styles.paymentFormInput}
                    type="tel"
                    name="cvc"
                    id="form-checkout__securityCode"
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                />
              </div>
            </div>

            {/* Email */}
            <div className={styles.paymentFormDiv}>
              <FiAtSign className={styles.paymentFormDivIcon} />
              <input
                  className={styles.paymentFormInput}
                  type="email"
                  name="cardholderEmail"
                  id="form-checkout__cardholderEmail"
                  onFocus={handleInputFocus}
              />
            </div>

            {/* Selector BANCO */}
            <div className={styles.paymentSelectDiv}>
              <AiOutlineBank className={styles.paymentFormDivIcon} />
              <select
                  className={styles.paymentSelect}
                  name="issuer"
                  id="form-checkout__issuer"
                  on
              ></select>
            </div>
            {/* Selector tipo de DNI */}
            <div className={styles.paymentSelectDiv}>
              <HiOutlineDocumentText className={styles.paymentFormDivIcon} />
              <select
                  className={styles.paymentSelect}
                  name="identificationType"
                  id="form-checkout__identificationType"
              ></select>
            </div>

            {/* DNI */}

            <div className={styles.paymentFormDiv}>
              <HiOutlineIdentification className={styles.paymentFormDivIcon} />
              <input
                  maxLength={10}
                  className={styles.paymentFormInput}
                  type="text"
                  name="identificationNumber"
                  id="form-checkout__identificationNumber"
              />
            </div>

            {/* Selector BANCO */}

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

            <progress value="0" className="progress-bar">
              Cargando...
            </progress>
          </form>
          {resultPayment && console.log(resultPayment)}
        </div>
      </div>
  );
}
