import { Switch, Route } from 'react-router';
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import SearchBar from './components/Searchbar/Searchbar';
import AboutUs from './pages/AboutUs/AboutUs';
import Home from './pages/Home/Home';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>


        <Route exact path='/'>
          <Home />

          <Footer />

        </Route>

        <Route exact path='/about-us'>
          <AboutUs />

          <Footer />

        </Route>

      </Switch>
    </div>
  );
}

export default App;
