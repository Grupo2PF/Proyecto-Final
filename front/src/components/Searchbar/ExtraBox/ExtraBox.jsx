import React, { FC, useState } from "react";

import style from './ExtraBox.module.scss'


function ExtraBox({ value, setValue, handleChange }) {


    return (


        <div className={style.extraBox}>

            <div className={style.box}>
                <label> Clase </label>
                <div >

                    <select name='class' onChange={handleChange}>
                        <option value='Economy'> Economy </option>
                        <option value='Premium-economy'> Premium-economy</option>
                        <option value='First'> First </option>
                        <option value='Business'> Business </option>
                    </select>
                </div>


            </div>
            <Counter value={value} setValue={setValue} name={'kid'} />






        </div>



    )


    }


 function Counter({ value, setValue, name }) {
    



   




   /*  function handleSum(e) {
        e.preventDefault()
        if (count < 5) {
            setValue({
                ...value,
                kid:value.kid+1
            })
        }} */
    



    function handleRes(e) {
        e.preventDefault()

     /*    if (count > 0) {

            setValue({
                ...value,
                kid:value.kid-1
            })

        }
 */

    }

    return (
        <div>
            <button >-</button>

            <h2>{value.kid}</h2>
            <button >+</button>

        </div>
    )


}




export default ExtraBox