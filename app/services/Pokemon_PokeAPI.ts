import axios from "axios";


// recuperation du type selectionner par le filtre
export async function getPokemonByType(type: string) {
    const response = await axios.get(type);
    console.log(type);
}

export async function fetchPokemonList(type: string = '', url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'): Promise<{ results: any[], next: string | null }> {
    const apiUrl = type ? `${type}/?offset=0&limit=20` : url;
    const response = await fetch(apiUrl);
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
    // data des pokemon (results) + url des pokemon suivant (next)
    return {
        results,
        next: data.next
    };
}



