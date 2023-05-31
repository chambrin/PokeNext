'use client';

import Pokemon from "@/app/components/home/Pokemon";
import Filter from "@/app/components/home/Filter";
import Information from "@/app/components/home/Information";
import '../styles/gobals.css';
import {useState} from "react";
import {getPokemonByType} from "@/app/services/Pokemon_PokeAPI";


export default function Home() {
    const [selectedType, setSelectedType] = useState<string>('');

    async function handleSelectType(type: string): Promise<void> {
        setSelectedType(type);
        await getPokemonByType(type);

    }



    return (
        <>
            <div className="Home grid grid-cols-4">
            <div className="col-span-1">
                <Filter onSelectType={handleSelectType} />
            </div>
            <div className="col-span-2">
                <Pokemon  />
            </div>
            <div className="col-span-1">
                <Information />
            </div>
        </div>
        </>

    )
}
