export default function PokemonCard({ pokemon, onPicked }) {
	return (
		<div className="pokemon-card" onClick={onPicked} tabIndex="0">
			<img src={pokemon.sprite} alt={pokemon.name} className="pokemon-card-sprite" />
			<div className="pokemon-card-name">{pokemon.name}</div>
		</div>
	);
}
