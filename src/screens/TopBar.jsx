import React from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem
} from '@nextui-org/react';
import { useSupabase } from '@/contexts/SupabaseContext';

const TopBar = () => {
  const { user } = useSupabase();
  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <span className="font-bold text-lg">LandSys</span>
      {user && (
        <Dropdown>
          <DropdownTrigger flat>
            {user.nickname || user.email} {/* Display user nickname or email */}
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
