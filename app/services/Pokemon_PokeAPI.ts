import axios from "axios";

export async function fetchPokemonList() {
    const cachedPokemon = localStorage.getItem('pokemonData');
    if (cachedPokemon) {
        // si des données sont stockées localement, renvoie les données
        return JSON.parse(cachedPokemon);
    }
    // si aucune donnée n'est stockée localement, récupère les données depuis l'API
    // recuperation des 20 premiers pokemons
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
    const pokemonList = response.data.results;
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
    return pokemonData;
}
