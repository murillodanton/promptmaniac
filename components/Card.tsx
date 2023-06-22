import { set } from "mongoose"
import { useEffect, useState } from "react"

export const Card = () => {

    const [pokemon, setPokemon] = useState<any>([])

    const getPokemon = async () => {

    const getPokemonUrl = (id:number) => `https://pokeapi.co/api/v2/pokemon/${id}`

    const pokemonPromises = []

    for (let i = 1; i <= 20; i++) {
        pokemonPromises.push(fetch(getPokemonUrl(i)).then(res => res.json()))
    }

    const pokemonData = await Promise.all(pokemonPromises)
    const sortedPokemon = pokemonData.sort((a,b) => a.id - b.id)
    setPokemon(sortedPokemon)
    console.log(sortedPokemon)
    }

    useEffect(() => {
        getPokemon()

    }, [])


    return (
        <div>
            <h1>PokeCard</h1>
            <div className="grid gap-2 grid-cols-3">
                {pokemon.map((p:any) => (
                    <div className="grid grid-flow-col place-items-center place-content-center bg-gray-300 rounded-lg pr-3 pb-2" style={{textAlign:'center'}} key={p.id}>
                        <div>
                        <img src={p.sprites.front_default} alt={p.name}/>
                        <h1 style={{
                            textTransform: 'capitalize'
                        }}>{p.types[0].type.name}</h1>
                        </div>
                        <p style={{
                            textTransform: 'capitalize'
                        }}>{String(p.name)}</p>

                    </div>
                ))}
                </div>
        </div>
    )
}