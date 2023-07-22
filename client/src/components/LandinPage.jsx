import { NavLink } from "react-router-dom";
import "./styles/LandingPage.css";

export default function LandingPage() {
	return (
		<div className="main">
			<header className="title">
				<h1>Explore Pokemons!</h1>
				<p>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Nostrum non nam velit sequi minima beatae quas, dolorem
					similique voluptatum expedita culpa, itaque, quod accusamus
					veritatis? Corporis vero soluta iste molestiae?
				</p>
			</header>
			<main className="context">
				<h1>Start Exploring Pokemons with eased</h1>
				<p>
					A website to easily explore all pokemons available and check
					stats, even create your own one!
				</p>
				<NavLink
					style={{ textDecoration: "none", cursor: "pointer" }}
					className="start"
					to="/home"
				>
					Start
				</NavLink>
				{/* <button>Start</button> */}
			</main>
		</div>
	);
}
