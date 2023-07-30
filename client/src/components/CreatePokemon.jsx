import "./styles/CreatePokemon.css";
import { useState } from "react";
import validation from "./validation";
import { useDispatch } from "react-redux";
import { createPokemon } from "../redux/pokemonsSlice";
import FormInput from "./FormInput";

const initialState = {
	name: "",
	image: "",
	health: "",
	attack: "",
	defense: "",
	speed: "",
	types: [],
};

const inputs = [
	{ id: 1, name: "name", placeholder: "Name", label: "Name", error: "" },
	{ id: 2, name: "image", placeholder: "Image", label: "Image", error: "" },
	{
		id: 3,
		name: "health",
		placeholder: "Health",
		label: "Health",
		error: "",
	},
	{
		id: 4,
		name: "attack",
		placeholder: "Attack",
		label: "Attack",
		error: "",
	},
	{
		id: 5,
		name: "defense",
		placeholder: "Defense",
		label: "Defense",
		error: "",
	},
	{ id: 6, name: "speed", placeholder: "Speed", label: "Speed", error: "" },
	{ id: 7, name: "types", placeholder: "Types", label: "Types", error: "" },
];

export default function CreatePokemon() {
	const [formPokemon, setFormPokemon] = useState(initialState);
	const [errors, setErrors] = useState(false);

	const dispatch = useDispatch();

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			dispatch(createPokemon(formPokemon));
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
		const { name, value } = e.target;
		const fieldErrors = validation(name, value);

		// Combine new error with existing errors
		setErrors((prevErrors) => ({
			...prevErrors,
			...fieldErrors,
		}));
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
				{inputs.map((input) => (
					<FormInput
						key={input.id}
						{...input}
						value={formPokemon[input.name]}
						onChange={onChange}
						onBlur={handleBlur}
						error={errors[input.name]}
					/>
				))}
				<button disabled={isFormIncomplete()}>Create</button>
			</form>
		</div>
	);
}
