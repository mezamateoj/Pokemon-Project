import "./styles/CreatePokemon.css";
import { useState } from "react";
import validation from "./validation";
import { useDispatch, useSelector } from "react-redux";
import { createPokemon } from "../redux/pokemonsSlice";

const initialState = {
	name: "",
	image: "",
	health: "",
	attack: "",
	defense: "",
	speed: "",
	types: [],
};

const errorStyles = {
	color: "#ff4742",
	fontSize: "10px",
};

export default function CreatePokemon() {
	const [formPokemon, setFormPokemon] = useState(initialState);
	const [errors, setErrors] = useState(initialState);

	const dispatch = useDispatch();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			await dispatch(createPokemon(formPokemon));
			setFormPokemon(initialState);
			setErrors(initialState);
		} catch (error) {
			alert(error.response.data.error);
		}
	}

	function onChange(e) {
		if (e.target.name === "types") {
			setFormPokemon({
				...formPokemon,
				types: e.target.value.split(",").map((type) => type.trim()),
			});
			return;
		}
		setFormPokemon({ ...formPokemon, [e.target.name]: e.target.value });
	}

	function handleBlur(e) {
		setErrors(
			validation({
				...formPokemon,
				[e.target.name]: e.target.value,
			})
		);
	}

	function isFormIncomplete() {
		return Object.values(formPokemon).some(
			(value) => !value || value.length === 0
		);
	}

	return (
		<div className="create-form">
			<h1>Create Pokemon</h1>
			<form className="create-pokemon" onSubmit={handleSubmit}>
				<label htmlFor="name">Name</label>
				<input
					type="text"
					name="name"
					value={formPokemon.name}
					onChange={onChange}
					onBlur={handleBlur}
				/>
				{errors.name && (
					<p style={errorStyles} className="error">
						{errors.name}
					</p>
				)}

				<label htmlFor="image">Image</label>
				<input
					type="text"
					name="image"
					value={formPokemon.image}
					onChange={onChange}
					onBlur={handleBlur}
				/>
				{errors.image && (
					<p style={errorStyles} className="error">
						{errors.image}
					</p>
				)}

				<label htmlFor="health">health</label>
				<input
					type="text"
					name="health"
					value={formPokemon.health}
					onChange={onChange}
					onBlur={handleBlur}
				/>
				{errors.health && (
					<p style={errorStyles} className="error">
						{errors.health}
					</p>
				)}

				<label htmlFor="attack">attack</label>
				<input
					type="text"
					name="attack"
					value={formPokemon.attack}
					onChange={onChange}
					onBlur={handleBlur}
				/>
				{errors.attack && (
					<p style={errorStyles} className="error">
						{errors.attack}
					</p>
				)}

				<label htmlFor="defense">defense</label>
				<input
					type="text"
					name="defense"
					value={formPokemon.defense}
					onChange={onChange}
					onBlur={handleBlur}
				/>
				{errors.defense && (
					<p style={errorStyles} className="error">
						{errors.defense}
					</p>
				)}

				<label htmlFor="speed">speed</label>
				<input
					type="text"
					name="speed"
					value={formPokemon.speed}
					onChange={onChange}
					onBlur={handleBlur}
				/>
				{errors.speed && (
					<p style={errorStyles} className="error">
						{errors.speed}
					</p>
				)}

				<label htmlFor="types">types</label>
				<input
					type="text"
					name="types"
					placeholder="grass, water, etc"
					value={formPokemon.types}
					onChange={onChange}
				/>

				<button disabled={isFormIncomplete()}>Create</button>
			</form>
		</div>
	);
}
