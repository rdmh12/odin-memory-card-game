export default function PokemonCard({ pokemon, onPicked, picked }) {
	return (
		<div className="pokemon-card" onClick={onPicked}>
			<img src={pokemon.sprite} alt={pokemon.name} className="pokemon-card-sprite" />
			<div className="pokemon-card-name">{picked ? "*" : ""}{pokemon.name}</div>
		</div>
	);
}
