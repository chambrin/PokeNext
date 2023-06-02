'use client';
interface PokeIllustrationProps {
    infoPokemon: any
}

export default function PokeIllustration({infoPokemon}: PokeIllustrationProps) {

  // défininie la valeur des illustrations a null pour les afficher que si elle existe
    let illustrationPixel = null;
    let illustrationArtWork = null;
    if (infoPokemon !== null) {
        //recuperation des image du pokemon
        illustrationPixel = infoPokemon.sprites.front_default;
        illustrationArtWork = infoPokemon.sprites.other["official-artwork"].front_default;
    }

    return (
        <div>
            <h1>Illustration du pokemon</h1>
           <img src={illustrationPixel} alt="Illustration pixel" />
          <img src={illustrationArtWork} alt="Illustration artwork" />
        </div>
    )
}
