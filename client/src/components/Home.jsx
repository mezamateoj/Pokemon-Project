import Logo from './Logo';
import Search from './Search';
import Pokemons from './Pokemons';
import './styles/Home.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons } from '../redux/thunks/thunks';
import Filters from './Filters';
import Pagination from './Pagination';
import Loading from './Loading';
import Footer from './Footer';

export default function Home() {
	const dispatch = useDispatch();

	const page = useSelector((store) => store.pokemons.currentPage);
	const [startPage, setStartPage] = useState(page);
	const [endPage, setEndPage] = useState(page + 1); // showing five pages at a time

	const pokemonsFromStore = useSelector((store) => store.pokemons);
	console.log(pokemonsFromStore);

	const loading = pokemonsFromStore.loading;
	const displayPokemons = pokemonsFromStore.displayedPokemons;
	const currentPage = pokemonsFromStore.currentPage;

	useEffect(() => {
		dispatch(getAllPokemons(page));
		setStartPage(page);
		setEndPage(page + 3);
	}, [page, dispatch]); //  I've added the page variable as a dependency to useEffect. This means that useEffect will be triggered each time the page state changes.

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
