import "./styles/search.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterByName } from "../redux/pokemonsSlice";

export default function Search() {
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();
	const pokemons = useSelector((store) => store.pokemons.pokemons);

	function onChange(e) {
		setSearch(e.target.value);
	}

	function dispatchFilterByName() {
		dispatch(filterByName(search));
	}
	console.log(search);
	return (
		<div className="search">
			<input
				value={search}
				className="search-bar"
				type="text"
				placeholder="🔍Search..."
				onChange={onChange}
			/>
			<button onClick={dispatchFilterByName}>Search</button>
		</div>
	);
}
