import { Switch, Route } from "react-router";
import "./App.css";
// import Footer from "./components/Footer/Footer";
// import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./pages/AboutUs/AboutUs";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </div>
  );
}

export default App;
