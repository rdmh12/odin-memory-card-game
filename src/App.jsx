import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard.jsx";

let initialized = false;

const testPokemonData = [
	{
		"id": 137,
		"name": "Porygon",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png"
	},
	{
		"id": 126,
		"name": "Magmar",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/126.png"
	},
	{
		"id": 156,
		"name": "Quilava",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/156.png"
	},
	{
		"id": 236,
		"name": "Tyrogue",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/236.png"
	},
	{
		"id": 86,
		"name": "Seel",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/86.png"
	},
	{
		"id": 114,
		"name": "Tangela",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/114.png"
	},
	{
		"id": 212,
		"name": "Scizor",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/212.png"
	},
	{
		"id": 125,
		"name": "Electabuzz",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/125.png"
	},
	{
		"id": 43,
		"name": "Oddish",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/43.png"
	},
	{
		"id": 141,
		"name": "Kabutops",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/141.png"
	},
	{
		"id": 177,
		"name": "Natu",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/177.png"
	},
	{
		"id": 37,
		"name": "Vulpix",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png"
	}
];

async function fetchPokemonData() {
	const pokemonCount = 12;
	const maxPokemonId = 251;
	const pokemonData = new Array(pokemonCount);

	for (let index = 0; index < pokemonCount; index++) {
		const id = Math.floor(Math.random() * maxPokemonId) + 1;
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const result = await response.json();

		pokemonData[index] = {
			id: result.id,
			name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
			sprite: result.sprites.other["official-artwork"].front_default,
		};
	}

	return pokemonData;
}

export default function App() {
	const [pokemonData, setPokemonData] = useState(testPokemonData);

	// useEffect(() => {
	// 	if (!initialized) {
	// 		initialized = true;
	// 		fetchPokemonData().then((pokemonData) => setPokemonData(pokemonData));
	// 	}
	// }, []);

	const pokemonCards = pokemonData.map((pokemon) => {
		return (
			<PokemonCard key={pokemon.id} pokemon={pokemon} />
		);
	});

	return (
		<div className="pokemon-card-container">
			{pokemonCards}
		</div>
	);
}
