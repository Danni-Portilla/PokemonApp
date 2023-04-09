import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';

const getPokemonById = async (id) => {
  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

const PokemonDetail = () => {
  const { id } = useParams();

  return (
    <>
      <PokemonCard />
    </>
  );
};

export default PokemonDetail;
