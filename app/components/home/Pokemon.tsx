'use client';
// import
import React, { useEffect, useState } from 'react';
import { fetchPokemonList } from '../../services/Pokemon_PokeAPI';

export default function Pokemon() {
    const [pokemonList, setPokemonList] = useState<any[]>([]);
    const [nextUrl, setNextUrl] = useState<string>('');

    useEffect(() => {
        async function fetchFirstPokemon() {
            const data = await fetchPokemonList();
            setPokemonList(data.results);
            setNextUrl(data.next);
        }
        fetchFirstPokemon().then(() => console.log('20 premiers Pokemon récupérés'));
    }, []);

    async function fetchNextPokemon() {
        const data = await fetchPokemonList(nextUrl);
        setPokemonList(prevState => [...prevState, ...data.results]);
        setNextUrl(data.next);
    }

    return (
        <main className="h-screen overflow-y-scroll lg:p-22 sm:p-8 scrollbar-hidden">
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
                        <img className="overflow-visible right-0 -mr-20 w-3/6" src={pokemon.image} alt={pokemon.name} />
                    </div>
                ))}
            </div>
            {nextUrl && (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={fetchNextPokemon}>
                    Afficher les 20 prochains Pokemon
                </button>
            )}
        </main>
    );
}
