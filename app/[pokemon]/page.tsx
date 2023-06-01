'use client';

//import de route
import {useRouter, useSearchParams} from 'next/navigation';

export default async function PagePokemon({ params }: { params: { slug: string }}) {
    console.log(params);


    return (

        <h1>Page du pokemon :  {params.slug}  </h1>

)

}