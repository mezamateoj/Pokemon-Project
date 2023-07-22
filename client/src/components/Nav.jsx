import "./styles/nav.css";
import { NavLink } from "react-router-dom";

export default function Nav() {
	return (
		<div className="nav">
			<ul>
				<NavLink
					to="/home"
					style={{
						textDecoration: "none",
						color: "#fff",
						cursor: "pointer",
					}}
				>
					<li>Home</li>
				</NavLink>
			</ul>
			<ul>
				<NavLink
					to="/create"
					style={{
						textDecoration: "none",
						color: "#fff",
						cursor: "pointer",
					}}
				>
					<li>Create</li>
				</NavLink>
			</ul>
			<ul>
				<NavLink
					to="/details"
					style={{
						textDecoration: "none",
						color: "#fff",
						cursor: "pointer",
					}}
				>
					<li>Details</li>
				</NavLink>
			</ul>
		</div>
	);
}
