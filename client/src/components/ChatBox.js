import React, { useState, useEffect } from 'react';
import { SocketContext, socket } from '../services/socket.js';

function ChatBox() {
  const [ username, setUsername ] = useState('');
  const [ usernameInput, setUsernameInput ] = useState('');

  const handleFormChange = (e) => {
    setUsernameInput(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!usernameInput) {
      return alert('Username cannot be empty!');
    }
    setUsername(usernameInput);
    setUsernameInput('');
  };

  //socket makes connection regardless of view - need to make changes so that connection only occurs after username is entered. Issue with multiple connection still?
  return username ? (
    <SocketContext.Provider value={socket}>
      <Chatroom username={username} />
    </SocketContext.Provider>
  ) : (
    <div className='userNameForm'>
      <h2>Please enter a username</h2>
      <form onSubmit={(e) => handleFormSubmit(e)}>
        <input id='username' onChange={(e) => handleFormChange(e)} required />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
}

function Chatroom({ username }) {
  console.log('chatroom - username', username);
  return (
    <div>
      <h2>Chat Room for Class ______</h2>
    </div>
  );
}

export default ChatBox;
