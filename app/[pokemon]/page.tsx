'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';



export default function PokemonPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    

    //requete pour récupérer les infos du pokemon
  const url = `https://pokeapi.co/api/v2/pokemon${pathname}`;


    return (
        <div>
            <h1>Page du Pokémon : {pathname}</h1>
            {/* Ajoutez ici le reste de votre code pour afficher les détails du Pokémon */}
        </div>
    );
}