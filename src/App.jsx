import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard.jsx";

const MESSAGE_LOADING = "...";

// const testPokemonData = {
// 	[137]: {
// 		"name": "Porygon",
// 		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/137.png"
// 	},
// 	[126]: {
// 		"name": "Magmar",
// 		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/126.png"
// 	},
// 	[156]: {
// 		"name": "Quilava",
// 		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/156.png"
// 	},
// 	[236]: {
// 		"name": "Tyrogue",
// 		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/236.png"
// 	},
// 	[86]: {
// 		"name": "Seel",
// 		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/86.png"
// 	},
// 	[114]: {
// 		"name": "Tangela",
// 		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/114.png"
// 	},
// 	[212]: {
// 		"name": "Scizor",
// 		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/212.png"
// 	},
// 	[125]: {
// 		"name": "Electabuzz",
// 		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/125.png"
// 	},
// 	[43]: {
// 		"name": "Oddish",
// 		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/43.png"
// 	},
// 	[141]: {
// 		"name": "Kabutops",
// 		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/141.png"
// 	},
// 	[177]: {
// 		"name": "Natu",
// 		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/177.png"
// 	},
// 	[37]: {
// 		"name": "Vulpix",
// 		"sprite": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/37.png"
// 	}
// };

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
		let id;

		// make sure that the random number generator picks unique ids
		do {
			id = Math.floor(Math.random() * maxPokemonId) + 1;
		} while (Object.hasOwn(pokemonData, id));

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
	// const [pokemonData, setPokemonData] = useState(testPokemonData);
	// const [pokemonOrder, setPokemonOrder] = useState(shufflePokemons(testPokemonData));
	// const [message, setMessage] = useState(null);

	const [pickedPokemonIds, setPickedPokemonIds] = useState(new Set());
	const [bestScore, setBestScore] = useState(0);
	const [fetchData, setFetchData] = useState(true);

	const [pokemonData, setPokemonData] = useState({});
	const [pokemonOrder, setPokemonOrder] = useState(shufflePokemons([]));
	const [message, setMessage] = useState(MESSAGE_LOADING);

	useEffect(() => {
		if (fetchData) {
			fetchPokemonData().then(([pokemonData, pokemonOrder]) => {
				setPokemonData(pokemonData);
				setPokemonOrder(pokemonOrder);
				setFetchData(false);
				setMessage(null);
			});
		}
	}, [fetchData]);

	const pickPokemonCard = (pokemonId) => {
		if (message != null) return;

		if (pickedPokemonIds.has(pokemonId)) {
			setMessage("Game Over!");
			setBestScore(Math.max(pickedPokemonIds.size, bestScore));
		} else {
			const newPickedPokemonIds = new Set(pickedPokemonIds);
			const newPokemonOrder = shufflePokemons(pokemonData);

			newPickedPokemonIds.add(pokemonId);

			if (newPickedPokemonIds.size == pokemonOrder.length) {
				setMessage("Victory!");
				setBestScore(Math.max(newPickedPokemonIds.size, bestScore));
			} else {
				setPokemonOrder(newPokemonOrder);
			}

			setPickedPokemonIds(newPickedPokemonIds);
		}
	};

	const pokemonCards = pokemonOrder.map((pokemonId) => {
		const pokemon = pokemonData[pokemonId];
		return (
			<PokemonCard
				key={pokemonId}
				pokemon={pokemon}
				pokemonId={pokemonId}
				onPicked={() => pickPokemonCard(pokemonId)} />
		);
	});

	const resetGame = () => {
		setMessage(MESSAGE_LOADING);
		setFetchData(true);
		setPickedPokemonIds(new Set());
	};

	return (
		<>
			<header>
				<div className="score">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
						<path d="M11.2827 3.45332C11.5131 2.98638 11.6284 2.75291 11.7848 2.67831C11.9209 2.61341 12.0791 2.61341 12.2152 2.67831C12.3717 2.75291 12.4869 2.98638 12.7174 3.45332L14.9041 7.88328C14.9721 8.02113 15.0061 8.09006 15.0558 8.14358C15.0999 8.19096 15.1527 8.22935 15.2113 8.25662C15.2776 8.28742 15.3536 8.29854 15.5057 8.32077L20.397 9.03571C20.9121 9.11099 21.1696 9.14863 21.2888 9.27444C21.3925 9.38389 21.4412 9.5343 21.4215 9.68377C21.3988 9.85558 21.2124 10.0372 20.8395 10.4004L17.3014 13.8464C17.1912 13.9538 17.136 14.0076 17.1004 14.0715C17.0689 14.128 17.0487 14.1902 17.0409 14.2545C17.0321 14.3271 17.0451 14.403 17.0711 14.5547L17.906 19.4221C17.994 19.9355 18.038 20.1922 17.9553 20.3445C17.8833 20.477 17.7554 20.57 17.6071 20.5975C17.4366 20.6291 17.2061 20.5078 16.7451 20.2654L12.3724 17.9658C12.2361 17.8942 12.168 17.8584 12.0962 17.8443C12.0327 17.8318 11.9673 17.8318 11.9038 17.8443C11.832 17.8584 11.7639 17.8942 11.6277 17.9658L7.25492 20.2654C6.79392 20.5078 6.56341 20.6291 6.39297 20.5975C6.24468 20.57 6.11672 20.477 6.04474 20.3445C5.962 20.1922 6.00603 19.9355 6.09407 19.4221L6.92889 14.5547C6.95491 14.403 6.96793 14.3271 6.95912 14.2545C6.95132 14.1902 6.93111 14.128 6.89961 14.0715C6.86402 14.0076 6.80888 13.9538 6.69859 13.8464L3.16056 10.4004C2.78766 10.0372 2.60121 9.85558 2.57853 9.68377C2.55879 9.5343 2.60755 9.38389 2.71125 9.27444C2.83044 9.14863 3.08797 9.11099 3.60304 9.03571L8.49431 8.32077C8.64642 8.29854 8.72248 8.28742 8.78872 8.25662C8.84736 8.22935 8.90016 8.19096 8.94419 8.14358C8.99391 8.09006 9.02793 8.02113 9.09597 7.88328L11.2827 3.45332Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					<div className="score-label">
						Score:
					</div>
					{pickedPokemonIds.size}
				</div>
				<div className="score">
					<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="presentation">
						<path d="M12 15C8.68629 15 6 12.3137 6 9V3.44444C6 3.0306 6 2.82367 6.06031 2.65798C6.16141 2.38021 6.38021 2.16141 6.65798 2.06031C6.82367 2 7.0306 2 7.44444 2H16.5556C16.9694 2 17.1763 2 17.342 2.06031C17.6198 2.16141 17.8386 2.38021 17.9397 2.65798C18 2.82367 18 3.0306 18 3.44444V9C18 12.3137 15.3137 15 12 15ZM12 15V18M18 4H20.5C20.9659 4 21.1989 4 21.3827 4.07612C21.6277 4.17761 21.8224 4.37229 21.9239 4.61732C22 4.80109 22 5.03406 22 5.5V6C22 6.92997 22 7.39496 21.8978 7.77646C21.6204 8.81173 20.8117 9.62038 19.7765 9.89778C19.395 10 18.93 10 18 10M6 4H3.5C3.03406 4 2.80109 4 2.61732 4.07612C2.37229 4.17761 2.17761 4.37229 2.07612 4.61732C2 4.80109 2 5.03406 2 5.5V6C2 6.92997 2 7.39496 2.10222 7.77646C2.37962 8.81173 3.18827 9.62038 4.22354 9.89778C4.60504 10 5.07003 10 6 10M7.44444 22H16.5556C16.801 22 17 21.801 17 21.5556C17 19.5919 15.4081 18 13.4444 18H10.5556C8.59188 18 7 19.5919 7 21.5556C7 21.801 7.19898 22 7.44444 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
					<div className="score-label">
						Best Score:
					</div>
					{bestScore}
				</div>
				<div className="stretched">
					<button className="reset-button" onClick={resetGame}>Reset</button>
				</div>
			</header>
			<main>
				{pokemonCards}
				<div className={message !== null ? "message" : "message-hidden"}>{message}</div>
			</main>
		</>
	);
}
