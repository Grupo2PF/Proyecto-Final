import React from 'react'
import MercadoPagoForm from '../../components/MercadoPago/MercadoPagoForm'
import styles from './PayPage.module.scss'
// import PayProcess from '../../components/PayProcess/PayProcess';


export default function PayPage (props: any): JSX.Element {
    return (
        <div className={styles.payPageContainer}>
            <MercadoPagoForm/>
        </div>
    )
}
