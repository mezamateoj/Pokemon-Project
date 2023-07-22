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
			<div className="detail-img">
				<img src={details.image} alt={details.name} />
			</div>
			<div className="detail-info">
				<h2>{details.name}</h2>
				<h4>{details.health}</h4>
				<h4>{details.attack}</h4>
				<h4>{details.defense}</h4>
				<h4>{details.speed}</h4>
			</div>
			<Pokemon key={details.id} details={details} />
		</div>
	);
}
