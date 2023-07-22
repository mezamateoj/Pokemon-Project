import './App.css';
import Nav from './components/Nav';
import LandingPage from './components/LandinPage';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Footer from './components/Footer';
import CreatePokemon from './components/styles/CreatePokemon';
import Details from './components/Details';

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreatePokemon />} />
        <Route path="/details" element={<Details />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
