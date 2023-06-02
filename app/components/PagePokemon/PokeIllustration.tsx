'use client';
interface PokeIllustrationProps {
    infoPokemon: any
}

export default function PokeIllustration({infoPokemon}: PokeIllustrationProps) {

    //recuperation des image du pokemon

    console.log(infoPokemon);


    const pokemonImage = infoPokemon.sprites.other['official-artwork'].front_default;
    const pokemonImageShiny = infoPokemon.sprites.front_shiny;


    return (
        <div>
         <h1>Illustration du pokemon</h1>
            <img src={pokemonImage} alt="image du pokemon" />
            <img src={pokemonImageShiny} alt="image du pokemon" />
        </div>
    )
}