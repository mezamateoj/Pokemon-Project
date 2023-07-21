import './App.css';
import Nav from './components/Nav';
import Logo from './components/Logo';
import Search from './components/Search';
import Pokemons from './components/Pokemons';

function App() {
  return (
    <div className="App">
      <Nav />
      <Logo />
      <Search />
      <Pokemons />
    </div>
  );
}

export default App;
