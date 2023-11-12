import MainView from './MainView';
import TablesView from './TablesView';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
  Outlet,
} from 'react-router-dom';
import TopBar from '@/screens/TopBar';
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
      element: <NavBarWrapper />,
      children: [
        {
          path: '/',
          element: <MainView />,
        },
        {
          path: '/tables',
          element: <TablesView />,
        },
        {
          path: '*',
          loader: () => redirect('/'),
        },
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

const NavBarWrapper = () => {
  return (
    <>
      <TopBar />
      <main className='px-10 py-5 pb-10 h-full overflow-y-auto dark:bg-black dark:text-white'>
        <Outlet />
      </main>
    </>
  );
};

export default LandSys;
