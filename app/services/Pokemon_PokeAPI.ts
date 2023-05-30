
import axios from "axios";

export async function fetchPokemonList(url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'): Promise<{ results: any[], next: string | null }> {
    const response = await fetch(url);
    const data = await response.json();
    const results = await Promise.all(data.results.map(async (pokemon: any) => {
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();
        return {
            id: pokemonData.id,
            name: pokemonData.name,
            types: pokemonData.types.map((type: any) => type.type.name),
            image: pokemonData.sprites.other['official-artwork'].front_default,
        };
    }));
    return {
        results,
        next: data.next
    };
}
