import { useState } from 'react';
import { useSupabase } from '../contexts/SupabaseContext';
import { Input, Button } from "@nextui-org/react";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {

  const [register_email, setRegisterEmail] = useState('');
  const [register_password, setRegisterPassword] = useState('');
  const [repeat_register_password, setRepeatRegisterPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [nickname, setNickname] = useState('');

  const supabase = useSupabase();
  if (supabase === null) return (<div>loading...</div>);

  const wrong_input = register_password !== repeat_register_password ||
    register_password === '' ||
    register_email === '' ||
    repeat_register_password === '' ||
    nombre === '' ||
    apellidos === '' ||
    nickname === '';

  const handleRegister = async () => {
    try {
      await supabase?.register(register_email, register_password, {
        apellidos,
        nombre,
        nickname,
        email: register_email
      })
    } catch (err) {
      console.log(err);
      toast.error('Error al registrarse: ' + err.message);
    }
  }

  const wrong_password = register_password !== repeat_register_password;
  const too_short_password = register_password.length < 8;

  return (
    <div className="flex w-[25%] p-10 drop-shadow border-solid border-1 border-grey/20 flex-col gap-5 items-center justify-center rounded-3xl bg-blue-100">
      <h1>Registro</h1>
      <div
        className="flex flex-col items-center justify-center gap-4"
      >
        <Input
          placeholder="Nombre..."
          type="text"
          onValueChange={setNombre}
          value={nombre}
        />
        <Input
          placeholder="Apellidos..."
          type="text"
          onValueChange={setApellidos}
          value={apellidos}
        />
        <Input
          placeholder="Nombre de usuario..."
          type="text"
          onValueChange={setNickname}
          value={nickname}
        />
        <Input
          placeholder="Email..."
          type="email"
          onValueChange={setRegisterEmail}
          value={register_email}
        />
        <Input
          placeholder="Contraseña..."
          type="password"
          onValueChange={setRegisterPassword}
          value={register_password} />
        <Input
          placeholder="Repita la contraseña..."
          type="password"
          onValueChange={setRepeatRegisterPassword}
          value={repeat_register_password} />
        {wrong_password && register_password!=='' && <p className="text-red-500">Las contraseñas no coinciden</p>}
        {too_short_password && !wrong_password && register_password!=='' && <p className="text-red-500">La contraseña debe tener al menos 8 caracteres</p>}
        { wrong_input && !wrong_password && !too_short_password && <p className="text-red-500">Rellene todos los campos</p> }
        <Button
          className="ml-2 bg-white text-black-500 font-semibold py-2 px-4 rounded-full"
          onClick={async () => { await handleRegister() }}
          isDisabled={wrong_input}
        >Registrarse</Button>
        <Link to="/"
        className="text-xl text-blue-500 hover:underline"
        >
          ¿Ya tiene una cuenta? Haga clic aquí</Link>
      </div>
    </div>
  )
}
export default Register;
