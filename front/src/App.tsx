import { Switch,Route } from 'react-router';
import './App.css';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';

function App() {
  return (
    <div>
      <Navbar />
      <Switch>
        {/* <Route exact path="/" component={Home} /> */}
        
        <Route path='/'>
          <Home/>

        </Route>

      </Switch>
          <Footer/>
    </div>
  );
}

export default App;
