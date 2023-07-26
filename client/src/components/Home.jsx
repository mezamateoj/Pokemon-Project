import Logo from "./Logo";
import Search from "./Search";
import Pokemons from "./Pokemons";
import Pokemon from "./Pokemon";
import "./styles/Home.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getPokemons, nextPage, prevPage } from "../redux/pokemonsSlice";

export default function Home({ pokemons, setPokemons, createdPokemons }) {
	const page = useSelector((store) => store.pokemons.currentPage);
	// const [page, setPage] = useState(1);
	// const [displayPokemons, setDisplayPokemons] = useState([]); // [1,2,3,4,5
	// const [totalPages, setTotalPages] = useState(0);
	const [startPage, setStartPage] = useState(page);
	const [endPage, setEndPage] = useState(page + 1); // showing five pages at a time
	// const [loading, setLoading] = useState(false);

	const pokemonsFromStore = useSelector((store) => store.pokemons);
	console.log(pokemonsFromStore);

	const loading = pokemonsFromStore.loading;
	const displayPokemons = pokemonsFromStore.displayedPokemons;
	const displayPokemonsByName = pokemonsFromStore.displayedPokemonsByName;
	console.log(displayPokemonsByName);
	const dispatch = useDispatch();

	// // get types from server or db
	// async function getPokemon(page) {
	// 	try {
	// 		setLoading(true);

	// 		const res = await axios.get(
	// 			`http://localhost:3001/pokemons?page=${page}&limit=12`
	// 		);
	// 		console.log(res.data);
	// 		setPokemons((prevPokemons) => [
	// 			...prevPokemons,
	// 			...res.data.pokemons,
	// 		]);
	// 		setDisplayPokemons(pokemonsFromStore.displayedPokemons);
	// 		// setPokemons(res.data.pokemons);
	// 		setPage(res.data.currentPage);
	// 		setTotalPages(res.data.totalPage);
	// 		setLoading(false);
	// 	} catch (error) {
	// 		console.error(error.message);
	// 	}
	// }

	useEffect(() => {
		dispatch(getPokemons(page));
		// setDisplayPokemons(pokemonsFromStore.displayedPokemons);

		// getPokemon(page);
		setStartPage(page);
		setEndPage(page + 3);
	}, [page, dispatch]); //  I've added the page variable as a dependency to useEffect. This means that useEffect will be triggered each time the page state changes.

	return (
		<>
			<Logo />
			<Search />
			{loading ? (
				<h1>Loading...</h1>
			) : displayPokemonsByName.length > 0 ? (
				<Pokemon
					key={pokemonsFromStore.id}
					details={displayPokemonsByName[0]}
				/>
			) : (
				<Pokemons
					key={pokemonsFromStore.id}
					displayPokemons={[...createdPokemons, ...displayPokemons]}
				/>
			)}
			{/* <Pokemons
				key={pokemons.id}
				displayPokemons={[...createdPokemons, ...displayPokemons]}
			/> */}
			<div className="pagination">
				{startPage === 1 ? (
					""
				) : (
					<button onClick={() => dispatch(prevPage(page))}>
						Previous
					</button>
				)}
				{/* <button
					onClick={() => setPage(page - 1)}
					disabled={startPage === 1 ? true : false}
				>
					Previous
				</button> */}
				{Array.from(
					{ length: endPage - startPage + 1 },
					(_, i) => startPage + i
				).map((pageNumber) => (
					<button
						key={pageNumber}
						onClick={() => dispatch(getPokemons(pageNumber))}
						className={pageNumber === page ? "active" : ""}
					>
						{pageNumber}
					</button>
				))}

				{/* <span>page {page}</span> */}
				<button onClick={() => dispatch(nextPage(page))}>Next</button>
			</div>
		</>
	);
}
