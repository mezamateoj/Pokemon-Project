import Logo from "./Logo";
import Search from "./Search";
import Pokemons from "./Pokemons";
import "./styles/Home.css";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home({ pokemons, setPokemons }) {
	const [page, setPage] = useState(1);
	const [displayPokemons, setDisplayPokemons] = useState([]); // [1,2,3,4,5
	const [totalPages, setTotalPages] = useState(0);
	const [startPage, setStartPage] = useState(page);
	const [endPage, setEndPage] = useState(page + 1); // showing five pages at a time
	const [loading, setLoading] = useState(false);

	// get types from server or db
	async function getPokemon(page) {
		try {
			setLoading(true);

			const res = await axios.get(
				`http://localhost:3001/pokemons?page=${page}&limit=12`
			);
			console.log(res.data);
			setPokemons((prevPokemons) => [
				...prevPokemons,
				...res.data.pokemons,
			]);
			setDisplayPokemons(res.data.pokemons);
			// setPokemons(res.data.pokemons);
			setPage(res.data.currentPage);
			setTotalPages(res.data.totalPage);
			setLoading(false);
		} catch (error) {
			console.error(error.message);
		}
	}

	useEffect(() => {
		getPokemon(page);
		setStartPage(page);
		setEndPage(page + 3);
	}, [page]); //  I've added the page variable as a dependency to useEffect. This means that useEffect will be triggered each time the page state changes.

	return (
		<>
			<Logo />
			<Search />
			<Pokemons
				key={pokemons.id}
				pokemons={pokemons}
				displayPokemons={displayPokemons}
			/>
			<div className="pagination">
				{startPage === 1 ? (
					""
				) : (
					<button onClick={() => setPage(page - 1)}>Previous</button>
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
						onClick={() => setPage(pageNumber)}
						className={pageNumber === page ? "active" : ""}
					>
						{pageNumber}
					</button>
				))}

				{/* <span>page {page}</span> */}
				<button onClick={() => setPage(page + 1)}>Next</button>
			</div>
		</>
	);
}
