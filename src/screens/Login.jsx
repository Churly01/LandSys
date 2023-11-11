import { useState } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import { Link } from 'react-router-dom';
import { Card, Input, Button } from "@nextui-org/react";
import RegisterScreen from './Register';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

const Login = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginScreen />
    },
    {
      path: '/register',
      element: <RegisterScreen />
    }
  ]);

  return (
    <RouterProvider router={router}/>
  );
}

const LoginScreen = () => {

  const [login_email, setLoginEmail] = useState('');
  const [login_password, setLoginPassword] = useState('');

  const wrong_input = login_email === '' || login_password === '';

  const supabase = useSupabase();

    if (supabase == null) return <div>Loading...</div>

  const handleLogin = async () => await supabase.login(login_email, login_password);

  return (
    <div
      className={`flex p-10 drop-shadow border-solid border-1 border-grey/20 flex-col
                  gap-5 items-center justify-center rounded-3xl bg-blue-100`}>
      <h1>Inicio de sesión</h1>
      <div
        className="flex flex-col items-center justify-center gap-4"
      >
        <Input
          placeholder="Email..."
          type="email"
          onValueChange={setLoginEmail}
          value={login_email}
        />
        <Input
          placeholder="Contraseña..."
          type="password"
          onValueChange={setLoginPassword}
          value={login_password} />
        <Button
          className="ml-2 bg-white text-black-500 font-semibold py-1 px-2 rounded-full"
          onClick={handleLogin}
          isDisabled={wrong_input}
        >
          Log in
        </Button>
        <Link
          to="/register"
          className="text-xl text-blue-500 hover:underline"
        >
          ¿No tiene cuenta? Haga clic aquí
        </Link>
      </div>
    </div>
  );
};


export default Login;
