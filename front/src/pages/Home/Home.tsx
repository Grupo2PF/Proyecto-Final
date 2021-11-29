import React from 'react'
import SearchBar from '../../components/Searchbar/Searchbar'
import style from './Home.module.scss'
import PopularDestinations from "../../components/PopularDestinations/PopularDestinations";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";



export default function Home() {
    return (
        <div className={style.allHome}>
            <Navbar/>

            <SearchBar />

            <PopularDestinations />


        </div>
    )
}
