import Logo from "./Logo";
import Search from "./Search";
import Pokemons from "./Pokemons";
import "./styles/Home.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons, nextPage, prevPage } from "../redux/pokemonsSlice";
import Filters from "./Filters";

export default function Home() {
	const page = useSelector((store) => store.pokemons.currentPage);
	const [startPage, setStartPage] = useState(page);
	const [endPage, setEndPage] = useState(page + 1); // showing five pages at a time

	const pokemonsFromStore = useSelector((store) => store.pokemons);
	console.log(pokemonsFromStore);

	const loading = pokemonsFromStore.loading;
	const displayPokemons = pokemonsFromStore.displayedPokemons;

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getPokemons(page));
		setStartPage(page);
		setEndPage(page + 3);
	}, [page, dispatch]); //  I've added the page variable as a dependency to useEffect. This means that useEffect will be triggered each time the page state changes.

	return (
		<>
			<Logo />
			<Search />
			<Filters />

			{loading ? (
				<h1>Loading...</h1>
			) : (
				<Pokemons
					key={displayPokemons.id}
					displayPokemons={
						displayPokemons.length === 1
							? displayPokemons
							: [...displayPokemons]
					}
				/>
			)}
			<div className="pagination">
				{startPage === 1 ? (
					""
				) : (
					<button onClick={() => dispatch(prevPage(page))}>
						Previous
					</button>
				)}

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

				<button onClick={() => dispatch(nextPage(page))}>Next</button>
			</div>
		</>
	);
}
