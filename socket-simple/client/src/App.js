import React, { useEffect, useContext } from 'react';
import Join from './components/Join';
import SocketContext from './context/SocketContext';
import './App.css';

const App = () => {
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className='wrapper'>
        <Join/>
    </div>
  );
};

export default App;
