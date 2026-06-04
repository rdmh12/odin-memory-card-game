import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard.jsx";

let initialized = false;

const testPokemonData = {
	[137]: {
		"name": "Porygon",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png"
	},
	[126]: {
		"name": "Magmar",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/126.png"
	},
	[156]: {
		"name": "Quilava",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/156.png"
	},
	[236]: {
		"name": "Tyrogue",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/236.png"
	},
	[86]: {
		"name": "Seel",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/86.png"
	},
	[114]: {
		"name": "Tangela",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/114.png"
	},
	[212]: {
		"name": "Scizor",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/212.png"
	},
	[125]: {
		"name": "Electabuzz",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/125.png"
	},
	[43]: {
		"name": "Oddish",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/43.png"
	},
	[141]: {
		"name": "Kabutops",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/141.png"
	},
	[177]: {
		"name": "Natu",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/177.png"
	},
	[37]: {
		"name": "Vulpix",
		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png"
	}
};

function shufflePokemons(pokemonData) {
	const order = Array.from(Object.keys(pokemonData));

	for (let index = order.length - 1; index > 0; index--) {
		const randomIndex = Math.floor(Math.random() * (index + 1));

		[order[index], order[randomIndex]] = [order[randomIndex], order[index]];
	}

	return order;
}

async function fetchPokemonData() {
	const pokemonCount = 12;
	const maxPokemonId = 251;
	const pokemonData = {};

	for (let index = 0; index < pokemonCount; index++) {
		const id = Math.floor(Math.random() * maxPokemonId) + 1;
		const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
		const result = await response.json();

		pokemonData[result.id] = {
			name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
			sprite: result.sprites.other["official-artwork"].front_default,
		};
	}

	const pokemonOrder = shufflePokemons(pokemonData);

	return [pokemonData, pokemonOrder];
}

export default function App() {
	const [pokemonData, setPokemonData] = useState(testPokemonData);
	const [pokemonOrder, setPokemonOrder] = useState(shufflePokemons(testPokemonData));
	const [pickedPokemonIds, setPickedPokemonIds] = useState(new Set());

	// const [pokemonData, setPokemonData] = useState({});
	// const [pokemonOrder, setPokemonOrder] = useState(shufflePokemons([]));
	//
	// useEffect(() => {
	// 	if (!initialized) {
	// 		initialized = true;
	// 		fetchPokemonData().then(([pokemonData, pokemonOrder]) => {
	// 			setPokemonData(pokemonData);
	// 			setPokemonOrder(pokemonOrder);
	// 		});
	// 	}
	// }, []);

	const pickPokemonCard = (pokemonId) => {
		const newPickedPokemonIds = new Set(pickedPokemonIds);
		const newPokemonOrder = shufflePokemons(pokemonData);

		newPickedPokemonIds.add(pokemonId);

		setPickedPokemonIds(newPickedPokemonIds);
		setPokemonOrder(newPokemonOrder);
	};

	const pokemonCards = pokemonOrder.map((pokemonId) => {
		const pokemon = pokemonData[pokemonId];
		const picked = pickedPokemonIds.has(pokemonId);
		return (
			<PokemonCard
				key={pokemonId}
				pokemon={pokemon}
				pokemonId={pokemonId}
				onPicked={() => pickPokemonCard(pokemonId)}
				picked={picked} />
		);
	});

	const resetGame = () => {
		// todo: fetch data
		setPokemonOrder(shufflePokemons(pokemonData));
		setPickedPokemonIds(new Set());
	};

	return (
		<>
			<div className="score">Score: {pickedPokemonIds.size}</div>
			<button onClick={resetGame}>Reset</button>
			<div className="pokemon-card-container">
				{pokemonCards}
			</div>
		</>
	);
}
