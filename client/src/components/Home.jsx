import Logo from "./Logo";
import Search from "./Search";
import Pokemons from "./Pokemons";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
	const [pokemons, setTPokemons] = useState([]);
	const [page, setPage] = useState(1); // [1, 2, 3, 4, 5

	// get types from server or db
	useEffect(() => {
		axios
			.get(`http://localhost:3001/pokemons?page=${page}&limit=12`)
			.then((res) => {
				setTPokemons(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [page]); //  I've added the page variable as a dependency to useEffect. This means that useEffect will be triggered each time the page state changes.

	const nextPage = () => setPage((prevPage) => prevPage + 1);
	const prevPage = () => setPage((prevPage) => Math.max(prevPage - 1, 1));

	return (
		<>
			<Logo />
			<Search />
			<Pokemons key={pokemons.id} pokemons={pokemons} />
			<button onClick={prevPage}>Previous</button>
			<button onClick={nextPage}>Next</button>
		</>
	);
}
