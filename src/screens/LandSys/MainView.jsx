import React from 'react';

const MainView = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2">
        Terrenos
      </button>

      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2">
        Parcelas
      </button>
    </div>
  );
};

export default MainView;
