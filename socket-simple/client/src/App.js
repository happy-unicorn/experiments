import React, { useEffect, useContext, useReducer } from 'react';
import axios from 'axios';
import SocketContext from './context/SocketContext';
import './App.css';

import reducer from './state/reducer';
import JoinBlock from './components/Join';
import Chat from './components/Chat';

const App = () => {
  const { socket } = useContext(SocketContext);
  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  };

  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="wrapper">
      {!state.joined ? (
        <JoinBlock onLogin={onLogin} />
      ) : (
        <Chat {...state} onAddMessage={addMessage} />
      )}
    </div>
  );
};

export default App;
