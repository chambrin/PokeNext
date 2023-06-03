'use client';
// import
import React, { useEffect, useRef, useState } from 'react';
import { fetchPokemonList, getPokemonByType } from '../../services/Pokemon_PokeAPI';
import Image from 'next/image';
import { motion } from 'framer-motion';


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


    // Icons des types
    // Icons des types
    const typesIcons = {
        bug: '/types-icons/bug.svg',
        dark: '/types-icons/dark.svg',
        dragon: '/types-icons/dragon.svg',
        electric: '/types-icons/electric.svg',
        fairy: '/types-icons/fairy.svg',
        fighting: '/types-icons/fighting.svg',
        fire: '/types-icons/fire.svg',
        flying: '/types-icons/flying.svg',
        ghost: '/types-icons/ghost.svg',
        grass: '/types-icons/grass.svg',
        ground: '/types-icons/ground.svg',
        ice: '/types-icons/ice.svg',
        normal: '/types-icons/normal.svg',
        poison: '/types-icons/poison.svg',
        psychic: '/types-icons/psychic.svg',
        rock: '/types-icons/rock.svg',
        steel: '/types-icons/steel.svg',
        water: '/types-icons/water.svg',
    };

    function getTypeIcon(type: string) {
        const icon = typesIcons[type.toLowerCase()];
        if (icon) {
            return <img src={icon} alt={`${type} type icon`} width={24} height={24} />;
        }
        return null;
    }

    return (
        <main ref={mainRef} className="pokedexMain h-screen overflow-y-scroll lg:p-22 sm:p-8 scrollbar-hidden">
            <div>
                {(filteredPokemonList.length > 0 ? filteredPokemonList : pokemonList).map((pokemon, index) => (

                    <div
                        onClick={() => SelectPokemon(pokemon)}
                        key={pokemon.name}
                        className={`PokeCard cursor-pointer scale-100 hover:scale-105 transition pl-12 rounded-2xl h-48 mb-44 flex flex-row items-center justify-between bg-opacity-60 bg-center bg-no-repeat bg-${pokemon.types[0].toLowerCase()}`}
                        style={{ backgroundImage: `url('/Pokeball.svg')` }}
                    >
                        <div className="hidden bg-grass" />
                        <div className="flex gap-2 flex-col">
                            <p className="text-4xl">#{pokemon.id}</p>
                            <p className="text-6xl">{pokemon.name}</p>
                            <div className="types-container flex gap-10">
                                {pokemon.types.map((type: string) => (
                                    <div
                                        className={`types-tags text-white text-2xl px-4 py-1 rounded flex items-center gap-4 bg-${type.toLowerCase()}`}
                                        key={type}
                                    >
                                        {getTypeIcon(type)}
                                        <p className="text-center mr-2">{type}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Image
                            width={500}
                            height={500}
                            className="overflow-visible right-0 -mr-20 w-3/6"
                            src={pokemon.image}
                            alt={pokemon.name}
                        />
                    </div>

                ))}
            </div>
        </main>
    );


}
