import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react';
import { useSupabase } from '@/contexts/SupabaseContext';
import { useNavigate } from 'react-router-dom';

const TopBar = () => {
  const { user, logout } = useSupabase();
  const navigate = useNavigate();
  const handleLogout = async () => {
    navigate('/');
    await logout();
  };

  return (
    <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
      <span className="font-bold text-lg w-full">LandSys</span>
      {user && (
        <div className='flex items-center'>
          <Dropdown>
            <DropdownTrigger className="flex items-center bg-white text-blue-500 font-semibold py-1 px-2 rounded-full">
              <span className="ml-2">Perfil</span>
            </DropdownTrigger>
            <DropdownMenu aria-label="Perfil">
              <DropdownItem key="user.email">
                <span className="font-bold">Email:</span> {user.email}
              </DropdownItem>
              <DropdownItem key="user.nickname">
                <span className="font-bold">Nickname:</span> {user.nickname}
              </DropdownItem>
              <DropdownItem key="user.nombre">
                <span className="font-bold">Nombre:</span> {user.nombre}
              </DropdownItem>
              <DropdownItem key="user.apellidos">
                <span className="font-bold">Apellidos:</span> {user.apellidos}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <button
            className="ml-2 bg-white text-danger-500 font-semibold py-1 px-2 rounded-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default TopBar;
