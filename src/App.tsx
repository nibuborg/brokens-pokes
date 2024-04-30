import { useEffect, useState } from "react";
import { Button } from "./components/Button/Button";

type Pokemon = {
  name: string;
  url: string;
  id: number
};

const getPokemonIdFromUrl = (url: string) =>
  url.split("/").filter(Boolean).pop();

const shuffleArray = (unshuffledArray: any[]) => unshuffledArray
  .map(value => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value)

const addIdToPokemons = (pokemons: any[]) => pokemons.map((pokemon, index) => ({ ...pokemon, id: index + 1 }))

function App() {
  const [pokemons, setPokemons] = useState<Pokemon[] | null>(null);
  const [chosenPokemons, setChosenPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=9&limit=6")
      .then((res) => res.json())
      .then((data) => setPokemons(shuffleArray(addIdToPokemons([...data.results, ...data.results]))));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setChosenPokemons([])
    }, 2000);

  }, [chosenPokemons])

  const isWin = chosenPokemons.length === 2 && chosenPokemons[0].name === chosenPokemons[1].name;

  isWin && setTimeout(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?offset=9&limit=6")
      .then((res) => res.json())
      .then((data) => setPokemons(shuffleArray(addIdToPokemons([...data.results, ...data.results]))));
  }, 5000)

  return (
    <div className="relative flex flex-col justify-center items-center gap-2 w-[100vw]">
      <div>
        <h2 className="text-3xl font-bold text-purple-200 mb-4">Pokemon memory cards</h2>
      </div>
      {isWin && <h1>You win!</h1>}
      <div className="flex gap-8 flex-wrap justify-center max-w-5xl m-auto">
        {!isWin && pokemons?.map((pokemon) => {
          const pokemonId = getPokemonIdFromUrl(pokemon.url);
          const isChosen = chosenPokemons.map((item) => item.id).includes(pokemon.id);
          return <div
            key={pokemonId}
            className="flex flex-col text-center items-center justify-center gap-2 border-2 border-cyan-300 rounded-lg p-4 h-48 w-[200px]"
          >
            {!isChosen && <Button
              className="w-16"
              onClick={() => {
                if (chosenPokemons.length < 2) {
                  setChosenPokemons([...chosenPokemons, pokemon]);
                } else {
                  setChosenPokemons([pokemon])
                }
              }}
            >
              ?
            </Button>}
            {isChosen && (
              <div>
                <img
                  width={120}
                  height={120}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                />
                <p>{pokemon.name}</p>
              </div>
            )}
          </div>
        })}
      </div>
    </div>
  );
}

export default App;
