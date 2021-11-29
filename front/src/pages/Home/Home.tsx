import React from 'react'
import SearchBar from '../../components/Searchbar/Searchbar'
import style from './Home.module.scss'



export default function Home() {
    return (
        <div className={style.allHome}>
            <SearchBar />

        </div>
    )
}
