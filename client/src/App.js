import './App.css';
import Nav from './components/Nav';
import Logo from './components/Logo';
import Search from './components/Search';
import Pokemons from './components/Pokemons';
import LandingPage from './components/LandinPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <Nav />
            <LandingPage />
          </Route>
          <Route exact path="/home">
            <Logo />
            <Search />
            <Pokemons />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
