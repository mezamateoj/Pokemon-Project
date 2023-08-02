import Logo from "./Logo";
import Search from "./Search";
import Pokemons from "./Pokemons";
import "./styles/Home.css";
import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux"; // using connect this hooks are not needed
import { getAllPokemons } from "../redux/thunks/thunks";
import Filters from "./Filters";
import Pagination from "./Pagination";
import Loading from "./Loading";
import Footer from "./Footer";
import { connect } from "react-redux";

export function Home({ pokemons, getAllPokemons }) {
	// Allows you to extract data from the Redux store state for use in this component, using a selector function.
	const page = pokemons.currentPage;
	console.log(page);

	const [startPage, setStartPage] = useState(page);
	const [endPage, setEndPage] = useState(page + 1);

	// const pokemonsFromStore = useSelector((store) => store.pokemons);
	const pokemonsFromStore = pokemons;
	console.log(pokemonsFromStore);

	const loading = pokemonsFromStore.loading;
	const displayPokemons = pokemonsFromStore.displayedPokemons;
	const currentPage = pokemonsFromStore.currentPage;

	useEffect(() => {
		getAllPokemons(page);
		setStartPage(page);
		setEndPage(page + 3);
	}, [page, getAllPokemons]); //  I've added the page variable as a dependency to useEffect. This means that useEffect will be triggered each time the page state changes.

	return (
		<>
			<Logo />
			<Search />
			<Filters />

			{loading ? (
				<Loading />
			) : (
				// <h1>Loading...</h1>
				<Pokemons
					key={displayPokemons.id}
					displayPokemons={
						displayPokemons.length === 1
							? displayPokemons
							: [...displayPokemons]
					}
				/>
			)}

			<Pagination
				startPage={startPage}
				endPage={endPage}
				page={page}
				currentPage={currentPage}
			/>
			<Footer />
		</>
	);
}

function mapStateToProps(state) {
	return {
		pokemons: state.pokemons,
	};
}

function mapDispatchToProps(dispatch) {
	return {
		getAllPokemons: (page) => dispatch(getAllPokemons(page)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
