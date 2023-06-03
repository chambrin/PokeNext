'use client';
import { useState } from 'react';
interface PokeIllustrationProps {
    infoPokemon: any
}

export default function PokeIllustration({ infoPokemon }: PokeIllustrationProps) {
    const [isLoading, setIsLoading] = useState(true);

    // défininie la valeur des illustrations a null pour les afficher que si elle existe
    let illustrationPixel = null;
    let illustrationArtWork = null;
    if (infoPokemon !== null) {
        //recuperation des image du pokemon
        illustrationPixel = new Image();
        illustrationPixel.src = infoPokemon.sprites.front_default;
        illustrationPixel.onload = () => setIsLoading(false);

        illustrationArtWork = new Image();
        illustrationArtWork.src = infoPokemon.sprites.other['official-artwork'].front_default;
        illustrationArtWork.onload = () => setIsLoading(false);
    }

    return (
        <div>
            <h1>Illustration du pokemon</h1>
            {isLoading ? (
                <div>Chargement en cours...</div>
            ) : (
                <>
                    <img src={illustrationPixel.src} alt="Illustration pixel" />
                    <img src={illustrationArtWork.src} alt="Illustration artwork" />
                </>
            )}
        </div>
    );
}
