'use client';

import Pokemon from "@/app/components/home/Pokemon";
import Filter from "@/app/components/home/Filter";
import Information from "@/app/components/home/Information";
import '../styles/gobals.css';
import { useEffect, useState } from "react";
import { getPokemonByType } from "@/app/services/Pokemon_PokeAPI";

export default function Home() {
    const [selectedType, setSelectedType] = useState<string>('');
    const [filteredPokemonList, setFilteredPokemonList] = useState<any[]>([]);

    // useEffect pour récupérer les pokemon filtrés
    useEffect(() => {
        async function fetchFilteredPokemon() {
            const pokemonFilterListFromStorage = localStorage.getItem('pokemonFilterList');
            if (pokemonFilterListFromStorage) {
                const pokemonList = JSON.parse(pokemonFilterListFromStorage);
                setFilteredPokemonList(pokemonList);
            }
        }
        fetchFilteredPokemon().then(r => console.log('Pokemon filtrés récupérés'));
    }, []);

    // function de cliaue sur un element du filtre du composant Filter
    async function handleSelectType(type: string): Promise<void> {
        setSelectedType(type);
        const pokemonFilterList = await getPokemonByType(type);
        setFilteredPokemonList(pokemonFilterList);
        localStorage.setItem('pokemonFilterList', JSON.stringify(pokemonFilterList));
    }

    return (
        <>
            <div className="Home grid grid-cols-4">
                <div className="col-span-1">
                    <Filter onSelectType={handleSelectType} />
                </div>
                <div className="col-span-2">
                    <Pokemon filteredPokemonList={filteredPokemonList} />
                </div>
                <div className="col-span-1">
                    <Information />
                </div>
            </div>
        </>
    )
}

