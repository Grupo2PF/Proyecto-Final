import { Switch, Route } from "react-router";
import "./App.css";
import "./firebaseConfig";
import Footer from "./components/Footer/Footer";
// import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./pages/AboutUs/AboutUs";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import PopularDestination from "./pages/PopularDestination/PopularDestination";
import Reset from "./pages/ResetPass/ResetPass";
import React from "react";
import OfferPage from "./pages/OfferPage/OfferPage";
import UpdateUserProfile from "./pages/UpdateUserProfile/UpdateUserProfile";
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <div>
      
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/popular-destination/:id" component={PopularDestination} />
        <Route exact path="/about-us" component={AboutUs}/>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/reset" component={Reset} />
        <Route exact path="/user" component={UserProfile} />
        <Route exact path="/user/update" component={UpdateUserProfile} />
        <Route exact path="/offers" component={OfferPage} />
      </Switch>
        <Footer/>
    </div>
  );
}

export default App;
