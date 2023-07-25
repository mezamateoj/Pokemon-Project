import React, { useState, useEffect } from "react";
import Pokemon from "./Pokemon";
import axios from "axios";

export default function Details() {
	const [details, setDetails] = useState([]);

	useEffect(() => {
		axios
			.get("http://localhost:3001/pokemons/1")
			.then((res) => {
				console.log(res.data);
				setDetails(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="details">
			<Pokemon key={details.id} details={details} />
		</div>
	);
}
