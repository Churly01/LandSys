import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  redirect
} from 'react-router-dom';
import { useSupabase } from './contexts/SupabaseContext';
import LandSys from './screens/LandSys';
import Login from './screens/Login';

function App() {

  const { user } = useSupabase();

  return (
    <>
      {user
        ? (
          <LandSys />
        )
        : (
          <div
            className="flex flex-col items-center justify-center gap-4 w-full h-full"
          >
            <Login />
          </div>
        )
      }
    </>
  )
}

export default App
