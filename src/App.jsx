import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  redirect
} from 'react-router-dom';
import { useSupabase } from './contexts/SupabaseContext';
import LandSys from './screens/LandSys';
import Login from './screens/Login';
import TopBar from './screens/TopBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
})

function App() {

  const { user } = useSupabase();

  return (
    <>
      {user
        ? (
          <QueryClientProvider client={queryClient}>
            <TopBar />
            <LandSys />
          </QueryClientProvider>
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
