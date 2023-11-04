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
      debugger;
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

  return (
    <div className="flex flex-col gap-5 w-full h-full items-center justify-center">
      <h2>Registro</h2>
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
          placeholder="Apellido..."
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
          placeholder="Repite la contraseña..."
          type="password"
          onValueChange={setRepeatRegisterPassword}
          value={repeat_register_password} />
        <Button
          onClick={async () => { await handleRegister() }}
          isDisabled={wrong_input}
        >Registrarse</Button>
        <Link to="/">Ya tienes una cuenta? Clica aquí</Link>
      </div>
    </div>
  )
}
export default Register;
