import "./styles/Pokemons.css";
import Pokemon from "./Pokemon";

export default function Pokemons({ displayPokemons }) {
	return (
		<div className="pokemons">
			{displayPokemons.length === 0 ? (
				<p>Not found</p>
			) : (
				displayPokemons.map((pokemon) => (
					<Pokemon key={pokemon.id} details={pokemon} />
				))
			)}
		</div>
	);
}
