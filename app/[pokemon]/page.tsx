'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import PokeEvolution from "@/app/components/PagePokemon/PokeEvolution";
import PokeIllustration from "@/app/components/PagePokemon/PokeIllustration";
import PokeStats from "@/app/components/PagePokemon/PokeStats";
import PokeWeakness from "@/app/components/PagePokemon/PokeWeakness";

import { useState, useEffect } from 'react';
import axios from "axios";

export default  function PokemonPage() {
    //rend disponible les info du pokemon selectionné dans le composant
    const [infoPokemon, setInfoPokemon] = useState(null);


    // ----------------- récupération du pathname -----------------
    // récupère le pathname
    const pathname = usePathname();
    // enleve le / du pathname
    const pathnameWithoutSlash = pathname.slice(1);



    // ----------------- fetch des donné -----------------
    useEffect(() => {
        // fetch des data du pokemon selectionné
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pathnameWithoutSlash}`)
            .then(response => {
                let infoPokemon = response.data;
                setInfoPokemon(infoPokemon);
            });
    }, [pathnameWithoutSlash]);


    // ----------------- affichage -----------------
    return (
        <div>
            <h1>Page du Pokémon : {pathnameWithoutSlash}</h1>
            <PokeIllustration infoPokemon={infoPokemon} />
            <PokeEvolution infoPokemon={infoPokemon} />
            <PokeStats infoPokemon={infoPokemon} />
            <PokeWeakness infoPokemon={infoPokemon} />
        </div>
    );
}