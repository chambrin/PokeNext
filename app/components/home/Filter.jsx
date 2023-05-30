import React, { useEffect, useState } from 'react';

export default function Filter({ onSelectType }) {
        const [types, setTypes] = useState([]);

        useEffect(() => {
                async function fetchTypes() {
                        const response = await fetch('https://pokeapi.co/api/v2/type');
                        const data = await response.json();
                        setTypes(data.results);
                }
                fetchTypes();
        }, []);

        return (
            <aside className="bg-amber-200 h-screen flex flex-col justify-center items-center">
                    <h2>Filter</h2>
                    {types.map((type) => (
                        <h3 key={type.name} onClick={() => onSelectType(type.url)}>
                                {type.name}
                        </h3>
                    ))}
            </aside>
        );
}
