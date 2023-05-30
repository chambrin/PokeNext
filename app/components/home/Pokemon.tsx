'use client';
// import
import React, { useEffect, useRef, useState } from 'react';
import { fetchPokemonList } from '../../services/Pokemon_PokeAPI';
import Image from 'next/image';

export default function Pokemon() {
    // pokemon list
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    //lien des 20 prochains pokemon
    const [nextUrl, setNextUrl] = useState<string>('');
    // selectionne le main
    const mainRef = useRef<HTMLDivElement>(null);
    // fetch les 20 premiers pokemon
    useEffect(() => {
        async function fetchFirstPokemon() {
            const data = await fetchPokemonList();
            setPokemonList(data.results);
            setNextUrl(data.next || '');
        }
        fetchFirstPokemon().then(() => console.log('20 premiers Pokemon récupérés'));
    }, []);

    // fetch les 20 pokemon suivants
    async function fetchNextPokemon() {
        const data = await fetchPokemonList(nextUrl);
        setPokemonList(prevState => [...prevState, ...data.results]);
        setNextUrl(data.next || '');
    }
    // scroll infini pour fetch les 20 pokemon suivants
    useEffect(() => {
        function handleScroll() {
            // si le main est selectionné
            if (mainRef.current) {
                // récupère la position du scroll et la hauteur du main
                const { scrollTop, clientHeight, scrollHeight } = mainRef.current;
                // si le scroll est en bas du main
                if (scrollTop + clientHeight === scrollHeight) {
                    // fetch les 20 pokemon suivants et affiche un message dans la console
                    fetchNextPokemon().then(r => console.log('20 Pokemon suivants récupérés'));
                }
            }
        }

        // déclencheur la fonction handleScroll
        if (mainRef.current) {
            // ajoute un event listener sur le main
            mainRef.current.addEventListener('scroll', handleScroll);
        }

        // supprime l'event listener
        return () => {
            if (mainRef.current) {
                mainRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [fetchNextPokemon, mainRef]);



    return (
        <main ref={mainRef} className="h-screen overflow-y-scroll lg:p-22 sm:p-8 scrollbar-hidden">
            <div>
                {pokemonList.map((pokemon, index) => (
                    <div
                        key={pokemon.name}
                        className="PokeCard p-16 bg-orange-200 rounded-2xl h-48 mb-44 flex flex-row items-center justify-between bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('/Pokeball.svg')` }}
                    >
                        <div className="flex flex-col">
                            <p className="font-custom">#{pokemon.id}</p>
                            <p className="font-custom">{pokemon.name}</p>
                            <div>
                                {pokemon.types.map((type: string) => (
                                    <p key={type}>{type}</p>
                                ))}
                            </div>
                        </div>
                        <Image width={500} height={500} className="overflow-visible right-0 -mr-20 w-3/6" src={pokemon.image} alt={pokemon.name} />
                    </div>
                ))}
            </div>
        </main>
    );
}
