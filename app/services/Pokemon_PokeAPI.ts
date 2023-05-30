import axios from "axios";

export async function fetchPokemonList() {
    const cachedPokemon = localStorage.getItem('pokemonData');
    // si des données sont stockées localement, renvoie les données stockées
    if (cachedPokemon) {
        return JSON.parse(cachedPokemon);
    }
    // si aucune donnée n'est stockée localement, récupère les données depuis l'API
    // recuperation des 20 premiers pokemons
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1273');
    const pokemonList = response.data.results;
    // récupère les données de chaque pokemon
    const pokemonData = await Promise.all(
        pokemonList.map(async (pokemon: any) => {
            const pokemonResponse = await axios.get(pokemon.url);
            return {
                ...pokemon,
                // récupère l'image officielle du pokemon
                image: pokemonResponse.data.sprites.other['official-artwork'].front_default,
                // récupère les types du pokemon
                types: pokemonResponse.data.types.map((type: any) => type.type.name),
            };
        })
    );

    // stocke les données localement
    localStorage.setItem('pokemonData', JSON.stringify(pokemonData));
    return {pokemonData, response};
}

