import React from 'react';
import { useLogout } from '../context/useLogout';

const Home = () => {
  const { logout } = useLogout();
  return (
    <div>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
};

export default Home;
