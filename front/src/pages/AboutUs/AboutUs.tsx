import React, { FC } from "react";
import { faGithub, faInstagram, faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from './AboutUs.module.scss'
import noimg from './photo/noimg2.jpg'


export default function AboutUs() {


    return (


        <div className={style.AboutUsTotal}>

            <h2>Sobre Nosotros</h2>
            <div className={style.AboutUs}>

                <Template name='Gonzalo Martinez' image={style.cardGonza} linkedin='' github='' instagram='' />
                <Template name='Ezequiel Grigolatto' image={style.cardEze} linkedin='' github='' instagram='' />
                <Template name='nombres apellido' image={style.cardEsteban} linkedin='' github='' instagram='' />
                <Template name='nombres apellido' image={style.cardAngel} linkedin='' github='' instagram='' />
                <Template name='nombres apellido' image={style.cardFer} linkedin='' github='' instagram='' />
                <Template name='nombres apellido' image={style.cardDavid} linkedin='' github='' instagram='' />
                <Template name='nombres apellido' image={style.cardBautista} linkedin='' github='' instagram='' />




            </div>

        </div>



    )
}







const Template: FC<Props> = ({ name, image, linkedin, github, instagram }) => (


    < div className={image} >



        <div className={style.linkBox}>

            <a href={linkedin}> <FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href={github}> <FontAwesomeIcon icon={faGithub} /></a>
            {instagram ? <a href={instagram}> <FontAwesomeIcon icon={faInstagram} /></a> : false}



        </div>

        <div className={style.nameBox}>

            <h4>{name}</h4>


        </div>











    </div >

)











type Props = {
    name: string
    image: string
    linkedin: string
    github: string
    instagram: string

}