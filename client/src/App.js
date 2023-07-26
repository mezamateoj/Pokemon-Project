import './App.css';
import Nav from './components/Nav';
import LandingPage from './components/LandinPage';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Footer from './components/Footer';
import CreatePokemon from './components/CreatePokemon';
import Details from './components/Details';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [types, setTypes] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [createdPokemons, setCreatedPokemons] = useState([]);






  // get types from server or db
  useEffect(() => {
    axios
      .get("http://localhost:3001/types")
      .then((res) => {
        setTypes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home pokemons={pokemons} setPokemons={setPokemons} createdPokemons={createdPokemons} />} />
        <Route path="/create" element={<CreatePokemon pokemons={pokemons} setPokemons={setPokemons}
          setCreatedPokemons={setCreatedPokemons} />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
