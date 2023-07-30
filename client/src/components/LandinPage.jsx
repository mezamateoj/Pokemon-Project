import { NavLink } from "react-router-dom";
import "./styles/LandingPage.css";

export default function LandingPage() {
	return (
		<div className="main">
			<header className="title">
				<div className="title-container">
					<h1>
						{
							<img
								src="pokeball.png"
								alt="pokeball"
								style={{ width: "32px" }}
							/>
						}{" "}
						Explore Pokemons!{" "}
						{
							<img
								src="pokeball.png"
								alt="pokeball"
								style={{ width: "32px" }}
							/>
						}
					</h1>
					<p>
						Discover new pokemons on every page, check their stats
						and create your own!
					</p>
				</div>
				<div className="title-img">
					<img
						src="./poke-img.webp"
						alt="pokemon dribble"
						width="400px"
					/>
				</div>
			</header>
			<main className="context">
				<h1>Start Exploring!</h1>
				<p>
					Filter them by type, origin, attack and name!<br></br> What
					Pokemon would you like to discover today?
				</p>
				<NavLink
					style={{ textDecoration: "none", cursor: "pointer" }}
					className="start"
					to="/home"
				>
					Explore
				</NavLink>
				{/* <button>Start</button> */}
			</main>
		</div>
	);
}
