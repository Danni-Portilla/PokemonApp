import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import { UserContext } from '../contexts/UserContext';

const PokedexLayout = () => {
  const { removeUser } = useContext(UserContext);
  return (
    <div>
      <div className="w-full bg-black h-9"></div>
      <div className="flex flex-col items-end p-3">
        <button
          className="bg-red-500 text-white p-2 hover:bg-red-400 w-26"
          onClick={removeUser}
        >
          Log out
        </button>
        <Outlet />
      </div>
    </div>
  );
};

export default PokedexLayout;
