import { useEffect, useState } from 'react'
import { Button } from './components/Button/Button'

type Pokemon = {
  name: string
  url: string
}

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then((res) => res.json())
      .then((data) => setPokemons(data.results))
  }, [])

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-[100vw]">
      <div>
        <h1 className="text-3xl font-bold text-purple-200 mb-4">
          Pokedex App
        </h1>
      </div>
      <div className="card">
        <Button onClick={() => setCount((count) => count + 1)}>
          +
        </Button>
        <Button onClick={() => setCount((count) => count + 1)}>
          -
        </Button>
      </div>
      <div className="flex gap-8 flex-wrap justify-center max-w-5xl m-auto">
        {pokemons?.map((pokemon, index) => <div>
          <p>{pokemon.name}</p>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`} />
        </div>)}
      </div>
    </div>


  )
}

export default App
