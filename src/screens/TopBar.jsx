import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@nextui-org/react';
import { useSupabase } from '@/contexts/SupabaseContext';

const TopBar = () => {
  const { user } = useSupabase();
  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <span className="font-bold text-lg w-full text-center">LandSys</span>
      {user && (
        <Dropdown>
          <DropdownTrigger>
            {user.email}
          </DropdownTrigger>
          <DropdownMenu aria-label="User Actions">
            <DropdownItem key="profile">Profile</DropdownItem>
            <DropdownItem key="settings">Settings</DropdownItem>
            <DropdownItem key="logout" color="error">Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      )}
    </div>
  );
};

export default TopBar;
