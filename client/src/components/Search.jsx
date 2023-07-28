import "./styles/search.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterByName } from "../redux/pokemonsSlice";

export default function Search() {
	const [search, setSearch] = useState("");
	const dispatch = useDispatch();

	function onChange(e) {
		setSearch(e.target.value);
	}

	async function dispatchFilterByName() {
		try {
			await dispatch(filterByName(search));
			setSearch("");
		} catch (error) {
			alert(`Pokemon: ${error.response.data.message}`);
		}
	}

	return (
		<div className="search">
			<input
				value={search}
				className="search-bar"
				type="text"
				placeholder="🔍pikachu..."
				onChange={onChange}
			/>
			<button className="pokemon-btn" onClick={dispatchFilterByName}>
				<span>Search</span>
			</button>
		</div>
	);
}
