'use client';
import React, { useEffect, useState } from 'react';
import { fetchPokemonList } from '../../services/Pokemon_PokeAPI';

export default function Pokemon() {
    const [pokemonList, setPokemonList] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchPokemonList();
            setPokemonList(data);
        }
        fetchData();
    }, []);

    return (
        <main>
            <div>
                {pokemonList.map(pokemon => (
                    <div key={pokemon.name}>
                        <img src={pokemon.image} alt={pokemon.name} />
                        <p>{pokemon.name}</p>
                        <ul>
                            {pokemon.types.map((type: string) => (
                                <li key={type}>{type}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </main>
    );
}
