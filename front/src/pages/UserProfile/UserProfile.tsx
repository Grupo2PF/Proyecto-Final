// import React, { FC } from 'react'
import datos from "./us";
import styles from "./UserProfile.module.scss";

export default function UserProfile(): JSX.Element {
  return (
    <div className={styles.pageContainer}>
      {datos.map((dato): JSX.Element => {
        return (
          <div className={styles.userProfileContainer}>
            {/* Contenedor de imagne y nombre */}
            <div className={styles.imgAndNameContainer}>
              <img src={dato.img} alt="Sin imagen" />
              <h1>
                {dato.name} {dato.apellido}
              </h1>
            </div>
            {/* Contendor de tarjetas de opciones */}
            <div className={styles.cardOptionsContainer}>
              <div className={styles.card}>
                <h1> Mis datos</h1>
                <div className={styles.cardOptions}>
                  <h3>Dni: {dato.dni}</h3>
                  <h3>Fecha de nacimiento: {dato.bDate}</h3>
                  <h3>Mail: {dato.email}</h3>
                  <h3>Nº de Telefono: {dato.phone}</h3>
                </div>
              </div>

              <div className={styles.card}>
                <h1>Mis favs</h1>
                {dato.fav.map((e: any) => (
                  <div className={styles.cardOptions}>
                    <h3>{e.name}</h3>
                  </div>
                ))}
              </div>

              <div className={styles.card}>
                <h1>Mis tikets</h1>
                {dato.tik.map((e: any) => (
                  <div className={styles.cardOptions}>
                    <h3>{e.originCity}</h3>
                    <h3>{e.destinyCity}</h3>
                    <h3>{e.departureDate}</h3>
                    <h3>{e.returnDate}</h3>
                    <h3>{e.journeyType}</h3>
                    <h3>{e.class}</h3>
                  </div>
                ))}
              </div>

              <div className={styles.button}>
                <button className={styles.btn1}>Cerrar sesion</button>
                <button className={styles.btn}>Eliminar cuenta</button>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
