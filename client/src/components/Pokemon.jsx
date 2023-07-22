import "./styles/Pokemon.css";

export default function Pokemon({ details }) {
	return (
		<div className="card">
			<div className="poke-img">
				<img src={details.image} alt={details.name} />
			</div>
			<div className="info">
				<span>{details.name}</span>
			</div>
		</div>
	);
}
