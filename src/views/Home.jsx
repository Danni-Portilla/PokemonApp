import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [nameValue, setnameValue] = useState('');
  const [nameError, setNameError] = useState(null);
  const { user, saveUser } = useContext(UserContext);

  const handleChange = (e) => {
    const newNameValue = e.target.value;
    setnameValue(newNameValue);

    if (newNameValue === '') setNameError('El nombre es requerido');
    else if (!/^[a-zA-Z]{5,}$/.test(newNameValue))
      setNameError('Solo letras y espacios en blanco son permitidos');
    else setNameError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameError) {
      saveUser(nameValue);
    }
  };

  return (
    <div>
      <div>
        <img src="/pokedex_img.png" alt="homepokedex" />
      </div>
      <div className="text-center">
        <h1 className="text-red-500 text-4xl font-bold">¡Hola entrenador!</h1>
        <p>Para poder comenzar, dame tu nombre</p>
      </div>
      <form
        className="flex flex-row justify-center items-center mt-8 gap-3"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="shadow-md border border-black p-3 rounded-2xl"
          value={nameValue}
          onChange={handleChange}
          placeholder=" Name"
        />
        <button
          type="submit"
          className="bg-red-500 text-white font-bold px-6 py-3 m-2 rounded shadow-md focus:ring hover:bg-azure-radiance-300 transition-all active:transform active:translate-y-1 hover:bg-red-400"
        >
          Start
        </button>
      </form>
      {nameError && <p className="text-red-500 text-center">{nameError} </p>}
      {user && <Navigate to="/pokedex" />}
    </div>
  );
};

export default Home;
