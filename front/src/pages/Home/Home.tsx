import React from "react";
import style from "./Home.module.scss";
// import SearchBar from "../../components/Searchbar/Searchbar";
import PopularDestinations from "../../components/PopularDestinations/PopularDestinations";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={style.aux} id="#home-top">
        {/* <SearchBar /> */}

        <PopularDestinations />

        <Footer />
      </div>
    </>
  );
}
