import MainView from './MainView';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

// Este es el componente principal donde hay que meter todos los demas componentes.
// Hay una carpeta en la que esta este componente que se llama LandSys,
// ahi es donde hay que meter todos los demas componentes, con su nombre apropiado

// Este componente se llama index.jsx porque es el componente principal de la carpeta
// Al tener ese nombre se reconoce como el componente principal de la carpeta
const LandSys = () => {

  // Esto es el router de la app. Aqui se definen las rutas de la app
  // Para cada ruta que queramos habrá un componente
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainView />,
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}
export default LandSys;