import { Switch, Route } from "react-router";
import "./App.css";
import AboutUs from "./pages/AboutUs/AboutUs";
import Home from "./pages/Home/Home";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import PopularDestination from "./pages/PopularDestination/PopularDestination";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/popular-destination/:id"
          component={PopularDestination}
        />
        <Route exact path="/about-us" component={AboutUs} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
    </div>
  );
}

export default App;
