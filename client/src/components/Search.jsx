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

	function dispatchFilterByName() {
		dispatch(filterByName(search));
		setSearch("");
	}

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
