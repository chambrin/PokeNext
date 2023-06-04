import React, { useEffect, useState } from 'react';

export default function Filter({ onSelectType, handleResetFilter }) {
        const [types, setTypes] = useState([]);

        useEffect(() => {
                async function fetchTypes() {
                        const response = await fetch('https://pokeapi.co/api/v2/type');
                        const data = await response.json();
                        setTypes(data.results);
                }
                fetchTypes();
        }, []);

        // Icons des types
        const typesIconsFilter = {
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

        function getTypeIconFilter(type) {
                const icon = typesIconsFilter[type.toLowerCase()];
                if (icon) {
                        return <img src={icon} alt={`${type} type icon`} width={24} height={24} />;
                }
                return null;
        }

        return (
            <aside className="h-screen p-16 grid gap-4 grid-cols-2" style={{ gridAutoFlow: 'dense' }}>
                    <button className=" border rounded-3xl bg-blue-500 text-amber-50  text-2xl col-span-2 cursor-pointer scale-100 hover:scale-95 hover:bg-blue-400 transition    " onClick={handleResetFilter}>Reset</button>
                    {types.map((type) => (
                        <div
                            className={`types-tags text-white text-2xl px-4 py-1 cursor-pointer scale-100 hover:scale-95 hover:bg-gray-300 transition rounded flex items-center gap-4 bg-${type.name}`}
                            key={type.name}
                            onClick={() => onSelectType(type.url)}
                        >
                                {getTypeIconFilter(type.name)}
                                {type.name}
                        </div>
                    ))}
            </aside>
        );

}
