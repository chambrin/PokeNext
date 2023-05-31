import axios from "axios";



// Filtre data structure json
export async function getPokemonByType(type: string) {
    const response = await axios.get(type);
    const pokemonFilterList = response.data.pokemon.map((pokemon: any) => {
        // recuperation des meme donner que dans la fonction fetchPokemonList
        return {
            id: pokemon.pokemon.url.split('/')[6],
            name: pokemon.pokemon.name,
            types: [type.split('/')[6]],
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.pokemon.url.split('/')[6]}.png`,
        };
    });
    localStorage.setItem('pokemonFilterList', JSON.stringify(pokemonFilterList)); // sauvegarde des données dans le local storage
    return pokemonFilterList;
}




// fonction de recuperation des données de l'api pokeapi et sauvegarde dans le local storage
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
    console.log(results);
    localStorage.setItem('pokemonList', JSON.stringify(results)); // sauvegarde des données dans le local storage
    return {
        results,
        next: data.next
    };
}
