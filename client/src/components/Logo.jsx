import "./styles/logo.css";
import { NavLink } from "react-router-dom";

export default function Logo() {
	return (
		<NavLink
			to="/"
			style={{
				textDecoration: "none",
				cursor: "pointer",
			}}
		>
			<div className="logo">
				<img
					className="logo-img"
					src="pokemon-logo.png"
					alt="logo"
					style={{ margin: "0 0 10px 0" }}
				/>
			</div>
		</NavLink>
	);
}
