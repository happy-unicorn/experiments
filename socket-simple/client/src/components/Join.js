import React from 'react';

const Join = () => {
  return (
    <div className='join-block'>
      <input type='text' placeholder='Enter room ID...'/>
      <input type='text' placeholder='Enter your name...'/>
      <button className='btn btn-success'>Enter</button>
    </div>
  );
};

export default Join;