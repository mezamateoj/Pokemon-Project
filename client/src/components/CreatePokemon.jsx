import "./styles/CreatePokemon.css";
import axios from "axios";
import { useState } from "react";

const initialState = {
	name: "",
	image: "",
	health: "",
	attack: "",
	defense: "",
	speed: "",
	types: [],
};

export default function CreatePokemon({ pokemons, setPokemons }) {
	// const [types, setTypes] = useState([]);

	function handleSubmit(e) {
		e.preventDefault();
		// setPokemons(initialState);
		axios.post("http://localhost:3001/pokemons", pokemons).then((res) => {
			console.log(res.data);
			setPokemons(res.data);
			// need to fix types array
		});
	}

	function onChange(e) {
		if (e.target.name === "types") {
			setPokemons({ ...pokemons, types: e.target.value.split(",") });
			return;
		}
		setPokemons({ ...pokemons, [e.target.name]: e.target.value });
	}

	return (
		<div className="create-form">
			<h1>Create Pokemon</h1>
			<form className="create-pokemon" onSubmit={handleSubmit}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					value={pokemons.name}
					onChange={onChange}
				/>

				<label htmlFor="image">Image</label>
				<input
					type="text"
					name="image"
					value={pokemons.image}
					onChange={onChange}
				/>

				<label htmlFor="health">health</label>
				<input
					type="text"
					name="health"
					value={pokemons.health}
					onChange={onChange}
				/>

				<label htmlFor="attack">attack</label>
				<input
					type="text"
					name="attack"
					value={pokemons.attack}
					onChange={onChange}
				/>

				<label htmlFor="defense">defense</label>
				<input
					type="text"
					name="defense"
					value={pokemons.defense}
					onChange={onChange}
				/>

				<label htmlFor="speed">speed</label>
				<input
					type="text"
					name="speed"
					value={pokemons.speed}
					onChange={onChange}
				/>

				<label htmlFor="types">types</label>
				<input
					type="text"
					name="types"
					value={pokemons.types}
					onChange={onChange}
				/>

				<button>Create</button>
			</form>
		</div>
	);
}
