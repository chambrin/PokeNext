'use client';

import Pokemon from "@/app/components/home/Pokemon";
import Filter from "@/app/components/home/Filter";
import Information from "@/app/components/home/Information";
import '../styles/gobals.css';
import { useEffect, useState, useContext } from "react";
import { getPokemonByType } from "@/app/services/Pokemon_PokeAPI";

import { useRouter } from 'next/navigation';



export default  function Home() {
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

    // function de clique sur un element du filtre du composant Filter
    async function handleSelectType(type: string): Promise<void> {
        setSelectedType(type);
        const pokemonFilterList = await getPokemonByType(type);
        setFilteredPokemonList(pokemonFilterList);
        localStorage.setItem('pokemonFilterList', JSON.stringify(pokemonFilterList));
    }

    // function qui vas vidé pokemonFilterList
    function handleResetFilter(): void {
        setFilteredPokemonList([]);
        localStorage.removeItem('pokemonFilterList');
        localStorage.removeItem('pokemonList');
    }


// route vers la page du pokemon
    const router = useRouter();
    function SelectPokemon(pokemon: any): void {
        const pokemonId = pokemon.id;
        const pokemonName = pokemon.name;
        navigateToPokemonPage(pokemonId, pokemonName);
    }

    function navigateToPokemonPage(pokemonId: number, pokemonName: string): void {
        router.push(`/${pokemonName}`);
    }



    return (
        <>

            <div className="Home grid grid-cols-4">
                <div className="col-span-1">
                    <Filter handleResetFilter={handleResetFilter} onSelectType={handleSelectType} />
                </div>
                <div className="col-span-2">
                    <Pokemon
                        SelectPokemon={SelectPokemon}
                        filteredPokemonList={filteredPokemonList}
                    />
                </div>
                <div className="col-span-1">
                    <Information />
                </div>
            </div>
        </>

    )

}

