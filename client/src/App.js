import './App.css';
import Nav from './components/Nav';
import LandingPage from './components/LandinPage';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import Footer from './components/Footer';
import CreatePokemon from './components/CreatePokemon';
import Details from './components/Details';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTypes } from './redux/typesSlice';

function App() {
  const dispatch = useDispatch();

  // get types from server or db
  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreatePokemon />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
