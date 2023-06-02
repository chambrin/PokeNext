'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';



export default function PokemonPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    // enleve le / du pathname
    const pathnameWithoutSlash = pathname.slice(1);


    //requete pour récupérer les infos du pokemon
  const FetchInfoUniquePokemon = `https://pokeapi.co/api/v2/pokemon/${pathnameWithoutSlash}`;




    return (
        <div>
            <h1>Page du Pokémon : {pathnameWithoutSlash}</h1>
            {/* Ajoutez ici le reste de votre code pour afficher les détails du Pokémon */}
        </div>
    );
}