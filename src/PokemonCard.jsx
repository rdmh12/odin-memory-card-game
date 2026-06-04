export default function PokemonCard({ pokemon }) {
	return (
		<div key={pokemon.id} className="pokemon-card">
			<img src={pokemon.sprite} alt={pokemon.name} className="pokemon-card-sprite" />
			<div className="pokemon-card-name">{pokemon.name}</div>
		</div>
	);
}
