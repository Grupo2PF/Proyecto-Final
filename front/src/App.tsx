import { Switch,Route } from 'react-router';
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import SearchBar from './components/Searchbar/Searchbar';
import Home from './pages/Home/Home';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
       
        
        <Route path='/s'>
          <Home/>
          <SearchBar/>

        </Route>

      </Switch>
          <Footer/>
    </div>
  );
}

export default App;
