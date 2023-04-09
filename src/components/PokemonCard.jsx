import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const getPokemonById = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonCard = ({ pokemonData }) => {
  const [pokemon, setPokemon] = useState(null);
  const navigate = useNavigate();

  const handleClickNavigate = () => {
    navigate(`/pokedex/${pokemon.id}`);
  };

  useEffect(() => {
    const loadPokemon = async () => {
      const pokemonInfo = await getPokemonById(pokemonData.url);
      setPokemon(pokemonInfo);
    };
    loadPokemon();
  }, []);

  return (
    <>
      {pokemon && (
        <article
          onClick={handleClickNavigate}
          className="hover:cursor-pointer rounded-2xl bg-gray-200  flex flex-col items-center justify-center border border-black"
        >
          <header>
            <div></div>
            <div>
              <img
                className="rounded-3xl bg-blue-200 m-3"
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
              />
            </div>
          </header>

          <section>
            <section>
              <h2 className="text-xl font-semibold text-red-900">
                {pokemon.name.toUpperCase()}
              </h2>
              <div className="flex gap-1">
                <span className="font-bold text-blue-900">TIPO: </span>
                <p>{pokemon.types[0].type.name}</p>
              </div>
            </section>
            <section>
              {pokemon.stats.map((stat) => (
                <section className="flex gap-1" key={stat.stat.name}>
                  <h3 className="font-bold text-blue-900">
                    {stat.stat.name.toUpperCase()}
                  </h3>
                  <p>{stat.base_stat}</p>
                </section>
              ))}
            </section>
          </section>
        </article>
      )}
    </>
  );
};

export default PokemonCard;
