import React, { useState, useEffect } from 'react';
import { SocketContext, socket } from '../services/socket.js';

function ChatBox() {
  const [ username, setUsername ] = useState('Bob');
  const [ nameInput, setNameInput ] = useState('');


  //socket makes connection regardless of view - need to make changes so that connection only occurs after username is entered.
  return username ? (
    <SocketContext.Provider value={socket}>
      <Chatroom username={username} />
    </SocketContext.Provider>
  ) : (
    <div>
      <h2>Username Form</h2>
    </div>
  )
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
