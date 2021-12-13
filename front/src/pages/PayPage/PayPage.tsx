import React from "react";
import { useLocation } from "react-router-dom";
import MercadoPagoForm from "../../components/MercadoPago/MercadoPagoForm";
import styles from "./PayPage.module.scss";
// import PayProcess from '../../components/PayProcess/PayProcess';

export default function PayPage(props: any) {
  const { state } = useLocation();

  return (
    <div className={styles.payPageContainer}>
      <MercadoPagoForm {...state} />
    </div>
  );
}
