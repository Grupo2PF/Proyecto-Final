import React from "react";

import style from './ExtraBox.module.scss'


function ExtraBox({ value, setValue, handleChange }) {


    return (


        <div className={style.extraBoxx}>

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


            <div className={style.counterBox}>


                <div className={style.counterBoxx}>

                    <label>Adultos</label>
                    <Counter value={value} setValue={setValue} name={'Adultos'} />
                </div>

                <div className={style.counterBoxx}>

                    <label>Menores</label>
                    <Counter value={value} setValue={setValue} name={'Menores'} />
                </div>


                <div className={style.counterBoxx}>

                    <label>Bebes</label>
                    <Counter value={value} setValue={setValue} name={'Bebes'} />
                </div>

            </div>




        </div>



    )


}


function Counter({ value, setValue, name }) {








    function handleSum(e) {
        e.preventDefault()


        if (name === 'Menores') {
            if (value.kid < 5) {
                setValue({
                    ...value,
                    kid: value.kid + 1
                })
            }
        }

        if (name === 'Bebes') {
            if (value.baby < 5) {
                setValue({
                    ...value,
                    baby: value.baby + 1
                })
            }
        }

        if (name === 'Adultos') {
            if (value.adult < 5) {
                setValue({
                    ...value,
                    adult: value.adult + 1
                })
            }

        }

    }




    function handleRes(e) {
        e.preventDefault()

        /*    if (count > 0) {
     
               setValue({
                   ...value,
                   kid:value.kid-1
               })
     
           }
    */

        if (name === 'Menores') {
            if (value.kid > 0) {
                setValue({
                    ...value,
                    kid: value.kid - 1
                })
            }

        }



        if (name === 'Bebes') {
            if (value.baby > 0) {
                setValue({
                    ...value,
                    baby: value.baby - 1
                })
            }
        }



        if (name === 'Adultos') {
            if (value.adult > 1) {
                setValue({
                    ...value,
                    adult: value.adult - 1
                })
            }

        }




    }

    return (
        <div className={style.counter}>
            <button onClick={e => handleRes(e)} >-</button>


            {name === 'Menores' ? <h2>{value.kid}</h2> : false}



            {name === 'Bebes' ? <h2>{value.baby}</h2> : false}



            {name === 'Adultos' ? <h2>{value.adult}</h2> : false}




            <button onClick={e => handleSum(e)} >+</button>
        </div>
    )


}




export default ExtraBox