'use client';
// import
import React, { useEffect, useRef, useState } from 'react';
import { fetchPokemonList, getPokemonByType } from '../../services/Pokemon_PokeAPI';
import Image from 'next/image';


export default function Pokemon({ filteredPokemonList, SelectPokemon }: {
    filteredPokemonList: any[],
    SelectPokemon: (pokemon: any) => void
}) {

    // pokemon list
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    // next url
    const [nextUrl, setNextUrl] = useState<string>('');
    // selectionne le main
    const mainRef = useRef<HTMLDivElement>(null);

    // useEffect pour récupérer les 20 premiers pokemon
    useEffect(() => {
        async function fetchFirstPokemon() {
            const pokemonListFromStorage = localStorage.getItem('pokemonList');
            if (pokemonListFromStorage) {
                setPokemonList(JSON.parse(pokemonListFromStorage));
            } else {
                const data = await fetchPokemonList();
                setPokemonList(data.results);
                setNextUrl(data.next || '');
            }
        }
        fetchFirstPokemon().then(() => console.log('20 premiers Pokemon récupérés'));
    }, []);

    // useEffect pour récupérer les 20 pokemon suivants
    async function fetchNextPokemon() {
        const data = await fetchPokemonList(nextUrl);
        setPokemonList(prevState => [...prevState, ...data.results]);
        setNextUrl(data.next || '');
    }

    // scroll infini pour fetch les 20 pokemon suivants
    useEffect(() => {
        function handleScroll() {
            if (mainRef.current) {
                const { scrollTop, clientHeight, scrollHeight } = mainRef.current;
                if (scrollTop + clientHeight === scrollHeight) {
                    fetchNextPokemon().then(r => console.log('20 Pokemon suivants récupérés'));
                }
            }
        }
        if (mainRef.current) {
            mainRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (mainRef.current) {
                mainRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, [fetchNextPokemon, mainRef]);




    return (
        <main ref={mainRef} className="pokedexMain h-screen overflow-y-scroll lg:p-22 sm:p-8 scrollbar-hidden">
            <div>
                {(filteredPokemonList.length > 0 ? filteredPokemonList : pokemonList).map((pokemon, index) => (
                    <div
                        onClick={() => SelectPokemon(pokemon)}
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
