import React from 'react'
import SearchBar from '../../components/Searchbar/Searchbar'
import style from './Home.module.scss'
import PopularDestinations from "../../components/PopularDestinations/PopularDestinations";



export default function Home() {
    return (
        <div className={style.allHome}>

            <SearchBar />

            <PopularDestinations />


        </div>
    )
}
