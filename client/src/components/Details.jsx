import "./styles/Details.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

export default function Details() {
	const [details, setDetails] = useState([]);
	const [loading, setLoading] = useState(false);
	const { id } = useParams();
	console.log(id);

	async function getDetails(id) {
		try {
			setLoading(true);

			const res = await axios.get(`/pokemons/${id}`);
			console.log(res.data);
			setDetails(res.data);
			setLoading(false);
		} catch (error) {
			console.error(error.message);
			alert(error.message);
		}
	}

	useEffect(() => {
		getDetails(id);
	}, [id]);

	return (
		<div className="details-container">
			<NavLink
				to={`/home`}
				style={{
					textDecoration: "none",
					width: "515px",
					margin: "10px 0 0 0",
				}}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="30"
					viewBox="0 0 24 24"
					width="30"
				>
					<path d="M0 0h24v24H0z" fill="none" />
					<path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
				</svg>
			</NavLink>
			{loading ? (
				<Loading />
			) : (
				<>
					<div className="detail-img">
						<img src={details.image} alt={details.name} />
					</div>
					<div className="stats-container">
						<div className="text-details">
							<h1>{details.name}</h1>

							{details.Types?.map(({ name }) => {
								return (
									<div key={name} className={name}>
										<span className="type-name">
											{name}
										</span>
									</div>
								);
							})}
						</div>

						<div className="label-detail">
							Health: <span>{details.health}</span>
						</div>
						<div className="stat-total">
							<div
								className="stat"
								// / 255 since pokemon health/stats is max 255
								style={{
									width: (details.health / 255) * 100 + "%",
								}}
							></div>
						</div>

						<div className="label-detail">
							Attack: <span>{details.attack}</span>
						</div>
						<div className="stat-total">
							<div
								className="stat"
								style={{
									width: (details.attack / 255) * 100 + "%",
								}}
							></div>
						</div>

						<div className="label-detail">
							Defense: <span>{details.defense}</span>
						</div>
						<div className="stat-total">
							<div
								className="stat"
								style={{
									width: (details.defense / 255) * 100 + "%",
								}}
							></div>
						</div>

						<div className="label-detail">
							Speed: <span>{details.speed}</span>
						</div>
						<div className="stat-total">
							<div
								className="stat"
								style={{
									width: (details.speed / 255) * 100 + "%",
								}}
							></div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
