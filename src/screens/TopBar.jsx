import React from 'react';
import { Dropdown } from '@nextui-org/react';

const TopBar = ({ user }) => {
  return (
    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <span className="font-bold text-lg">LandSys</span>
      {user && (
        <Dropdown>
          <Dropdown.Button flat>
            {user.nickname || user.email} {/* Display user nickname or email */}
          </Dropdown.Button>
          <Dropdown.Menu aria-label="User Actions">
            <Dropdown.Item key="profile">Profile</Dropdown.Item>
            <Dropdown.Item key="settings">Settings</Dropdown.Item>
            <Dropdown.Item key="logout" color="error">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
    </div>
  );
};

export default TopBar;
