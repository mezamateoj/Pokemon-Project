import "./styles/Pokemons.css";
import Pokemon from "./Pokemon";
export default function Pokemons({ pokemons }) {
	return (
		<div className="pokemons">
			{pokemons.map((pokemon) => (
				<Pokemon key={pokemon.id} details={pokemon} />
			))}
		</div>
	);
}
