import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
import { UserContext } from '../contexts/UserContext';
import PokemonCard from '../components/PokemonCard';
import { usePagination } from '../hooks/usePagination';
import { Form } from 'react-router-dom';

const Pokedex = () => {
  const { user } = useContext(UserContext);
  const { pokemons, types, name, type } = useLoaderData();
  const [pokemonName, setPokemonName] = useState(name ?? '');
  const [pokemonType, setPokemonType] = useState(type ?? '');
  const pokemonsPagination = usePagination(pokemons, 33);

  const handleNameChange = (e) => {
    setPokemonName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setPokemonType(e.target.value);
  };

  useEffect(() => {
    setPokemonName(name ?? '');
  }, [name]);

  useEffect(() => {
    setPokemonType(type ?? '');
  }, [type]);

  return (
    <div className="w-full p-6 flex flex-col items-center justify-center">
      <p className="text-3xl">
        <span className="text-blue-700 font-semibold">
          Bienvenido {user.toUpperCase()}
        </span>
        , aqui podras encontrar tu pokemon favorito
      </p>

      <div className="flex flex-row gap-2 text-xl p-3">
        {pokemonsPagination.pages.map((page) => (
          <button
            key={page}
            onClick={() => pokemonsPagination.changePageTo(page)}
            className={pokemonsPagination.currentPage === page ? 'text-red-500' : ''}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="p-1 m-6">
        <Form>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-3">
              <input
                type="text"
                name="pokemon_name"
                className="shadow-md border border-black rounded-2xl px-16 h-12"
                value={pokemonName}
                onChange={handleNameChange}
                placeholder=" Filter for search"
              />
              <button
                className="bg-red-500 text-white font-bold px-6 py-1 rounded shadow-md focus:ring hover:bg-azure-radiance-300 transition-all active:transform active:translate-y-1 hover:bg-red-400"
                type="submit"
              >
                Search
              </button>
              <select
                name="pokemon_type"
                value={pokemonType}
                onChange={handleTypeChange}
                className="border border-blue-700  rounded-xl w-40 h-12 text-center"
              >
                <option value="">All</option>
                {types.map((type) => (
                  <option key={type.url} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </Form>
      </div>

      <section className="w-full grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
        {pokemonsPagination.listSlice.map((pokemon) => (
          <PokemonCard key={pokemon.url} pokemonData={pokemon} />
        ))}
      </section>
    </div>
  );
};

export default Pokedex;
