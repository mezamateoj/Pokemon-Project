import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Details() {
	const [details, setDetails] = useState([]);
	const { id } = useParams();
	console.log(id);

	async function getDetails(id) {
		try {
			const res = await axios.get(`http://localhost:3001/pokemons/${id}`);
			console.log(res.data);
			setDetails(res.data);
		} catch (error) {
			console.error(error.message);
		}
	}

	useEffect(() => {
		getDetails(id);
	}, [id]);

	return (
		<div className="id-container">
			<img src={details.image} alt={details.name} />
			<div className="stats">
				<h1>{details.name}</h1>
			</div>
		</div>
	);
}
