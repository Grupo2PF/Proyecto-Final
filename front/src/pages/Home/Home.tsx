import React from 'react'
import SearchBar from '../../components/Searchbar/Searchbar'
import style from './Home.module.scss'
import PopularDestinations from "../../components/PopularDestinations/PopularDestinations";
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';
import Chat from "../../components/Chatbot/Chatbot"


export default function Home() {
    return (
        <>
        <Navbar/>
        <div className={style.allHome}>

            <SearchBar />

            <PopularDestinations />

            <Chat/>
        </div>
        </>
    )
}
