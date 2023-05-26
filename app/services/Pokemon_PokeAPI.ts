import axios from 'axios';

// récupère la liste des 20 premiers Pokemons avec leurs illustrations artwork et leurs types
export async function fetchPokemonList() {
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
    const pokemonList = response.data.results;
    const pokemonData = await Promise.all(
        pokemonList.map(async (pokemon: any) => {
            const pokemonResponse = await axios.get(pokemon.url);
            return {
                ...pokemon,
                image: pokemonResponse.data.sprites.other['official-artwork'].front_default,
                types: pokemonResponse.data.types.map((type: any) => type.type.name),
            };
        })
    );
    return pokemonData;
}
