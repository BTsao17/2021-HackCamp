import React, { useState, useEffect, useContext } from 'react';
import { SocketContext, socket } from '../services/socket.js';

function ChatBox() {
  const [ username, setUsername ] = useState('');
  const [ usernameInput, setUsernameInput ] = useState('');

  const handleFormChange = (e) => {
    setUsernameInput(e.target.value.trim());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (usernameInput !== '') {
      setUsername(usernameInput);
      setUsernameInput('');
    }
  };

  //socket makes connection regardless of view - need to make changes so that connection only occurs after username is entered.
  return (
    <div id='chatBox'>
      {username ? (
        <SocketContext.Provider value={socket}>
          <Chat username={username} />
        </SocketContext.Provider>
      ) : (
        <div id='userNameForm'>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <h2>Please enter a username: </h2>
            <input id='username' value={usernameInput} onChange={(e) => handleFormChange(e)} required />
            <button type='submit'>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}

function Chat({ username }) {
  const clientSocket = useContext(SocketContext);

  const [ messages, setMessages ] = useState([]);
  const [ textInput, setTextInput ] = useState('');

  //listening for events from server
  useEffect(
    () => {
      clientSocket.on('send message', (data) => {
        let newMessagesArr = [ ...messages, data ];
        setMessages(newMessagesArr);
      });
    },
    [ clientSocket, messages ]
  );

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleTextInputSubmit = (e) => {
    e.preventDefault();
    if (textInput !== '') {
      //emit to backend
      clientSocket.emit('send message', {
        text: textInput,
        user: username,
      });
      setTextInput('');
    }
  };

  return (
    <div>
      <h2>Chat Room for Class ______</h2>
      <button>Exit Chat</button>
      <div>
        <p>messages will be displayed here.</p>
        <ul>
          {messages.map((message, i) => {
            return (
              <li key={i}>
                <p>{message.user}</p>
                <p>{message.text}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div id='textForm'>
        <form onSubmit={(e) => handleTextInputSubmit(e)}>
          <input id='textMsg' value={textInput} onChange={(e) => handleTextInputChange(e)} required />
          <button type='submit'>Send</button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
