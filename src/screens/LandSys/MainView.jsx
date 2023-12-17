import {
  Link
} from 'react-router-dom';

const MainView = () => {

  return (
    // Added mt-0 to start from the top and mb-auto to push everything up
    <div className="flex flex-col items-center justify-start mt-0 mb-auto pt-10 h-screen">
      {/* Application Description */}
      <div className="mb-8 px-4 text-center">
        <h2 className="text-lg font-semibold mb-2">Bienvenido a LandSys</h2>
        <p className="text-sm">
          LandSys es una solución de gestión de terrenos. Permite la administración de terrenos (fincas o latifundios) y de parcelas (subdivisiones de terrenos). Se pueden añadir, editar y eliminar terrenos y parcelas. Para acceder a dichas funciones, utilice los botones de abajo.
        </p>
      </div>

      {/* Button and Description for Terrenos */}
      <div className="mb-4 text-center">
        <p className="mb-2">Explore y gestione sus Terrenos.</p>
        <Link
          to={{
            pathname: "/tables",
            hash: "#terrenos"
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Terrenos
        </Link>
      </div>

      {/* Button and Description for Parcelas */}
      <div className="mb-4 text-center">
        <p className="mb-2">Explore y gestione sus Parcelas.</p>
        <Link
          to={{
            pathname: "/tables",
            hash: "#parcelas"
          }}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Parcelas
        </Link>
      </div>
      <div className="mb-4 text-center">
        <p className="mb-2">Explore y gestione sus Arrendatarios.</p>
        <Link
          to={{
            pathname: "/tables",
            hash: "#arrendatarios"
          }}
          className="bg-red-400 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Arrendatarios
        </Link>
      </div>
      <div className="mb-4 text-center">
        <p className="mb-2">Explore y gestione sus Alquileres.</p>
        <Link
          to={{
            pathname: "/tables",
            hash: "#alquileres"
          }}
          className="bg-slate-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Alquileres
        </Link>
      </div>
    </div>
  );
};

export default MainView;
