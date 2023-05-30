'use client';
// import
import React, { useEffect, useState } from 'react';
import { fetchPokemonList } from '../../services/Pokemon_PokeAPI';


export default function Pokemon() {
    const [pokemonList, setPokemonList] = useState<any[]>([]);



    useEffect(() => {
        async function fetchData() {
            const data = await fetchPokemonList();
            setPokemonList(data);
        }

        fetchData().then(r => console.log(r));
    }, []);


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
                            <p className="font-custom">{pokemon.id}</p>
                            <p>#{index + 1}</p>
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
        </main>
    );
}
