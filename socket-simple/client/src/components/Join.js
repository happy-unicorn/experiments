import React, { useState } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onEnter = async () => {
    if (!roomId || !userName) {
      return alert('Неверные данные');
    }
    setLoading(true);
    await axios.post('/rooms', {
      roomId,
      userName,
    });
    onLogin({
      roomId,
      userName,
    });
  };

  return (
    <div className="join-block">
      <input
        type="text"
        placeholder="Enter room ID..."
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your name..."
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <button disabled={isLoading} onClick={onEnter} className="btn btn-success">
        {isLoading ? <Spinner animation='grow'/> : 'GO'}
      </button>
    </div>
  );
}

export default JoinBlock;