import "./styles/Pokemon.css";
import { NavLink } from "react-router-dom";

export default function Pokemon({ details }) {
	return (
		<div className="card">
			<img src={details.image} alt={details.name} />

			<div className="info">
				<span>{details.name}</span>
				<span>{details.Types.map((type) => type.name + " ")} </span>
				{/* <span>{details.id}</span> */}
				<NavLink to={`/details/${details.id}`}>
					<button>Details</button>
				</NavLink>
			</div>
		</div>
	);
}
