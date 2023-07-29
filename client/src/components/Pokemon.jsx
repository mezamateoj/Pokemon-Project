import "./styles/Pokemon.css";
import { NavLink } from "react-router-dom";

export const getTypeIconSrc = (type) => `./types/${type}.svg`;

export default function Pokemon({ details }) {
	return (
		<NavLink
			to={`/details/${details.id}`}
			style={{ textDecoration: "none" }}
		>
			<div className={`card ${details.Types[0].name}-card`}>
				<div className="image-card">
					<span>{details.name}</span>
					<img
						src={details.image}
						alt={details.name}
						className={`pokemon-image ${details.Types[0].name}`}
					/>
				</div>

				<div className="info">
					<div className="types">
						{details.Types.map(({ name }) => {
							const typeImg = getTypeIconSrc(name);

							return (
								<div key={name} className={name}>
									<img
										src={typeImg}
										alt={name}
										// style={{ width: "10px" }}
									/>
									<span className="type-name">{name}</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</NavLink>
	);
}
