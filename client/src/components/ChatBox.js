import React, { useState, useEffect, useContext } from 'react';
import { SocketContext, socket } from '../services/socket.js';
import './chatbox.css';

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

  const removeUsername = (e) => {
    setUsername('');
  };

  //socket makes connection regardless of view - need to make changes so that connection only occurs after username is entered.
  return (
    <div id='chatBox'>
      {username ? (
        <SocketContext.Provider value={socket}>
          <Chat username={username} logoff={removeUsername} />
        </SocketContext.Provider>
      ) : (
        <div id='usernameForm'>
          <h2 className='formPrompt'>Please enter a username: </h2>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <input
              id='username'
              className='usernameInput'
              value={usernameInput}
              onChange={(e) => handleFormChange(e)}
              required
            />
            <button className='usernameBut' type='submit'>
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function Chat({ username, logoff }) {
  const clientSocket = useContext(SocketContext);

  const [ messages, setMessages ] = useState([]);
  const [ textInput, setTextInput ] = useState('');

  //set up socket connection to server
  useEffect(
    () => {
      clientSocket.connect();
      clientSocket.emit('login', { username });
    },
    [ clientSocket, username ]
  );

  //listening for events from server
  useEffect(
    () => {
      clientSocket.on('send message', (data) => {
        let newMessagesArr = [ ...messages, data ];
        setMessages(newMessagesArr);
      });
      //unbind event handlers before component unmounts: socket.off('send message', listener)?
      return () => {
        socket.off('send message'); //not sure if need to do something similar on server-side.
      };
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

  //'exiting chat'
  const handleExit = (e) => {
    e.preventDefault();
    console.log('exit chat click');
    clientSocket.disconnect(true);
    logoff();
  };

  return (
    <div id='chat'>
      <header className='chatHeader'>
        <div>
          <h2>Chat Room for Class ______</h2>
          <p>You are signed in as: {username}</p>
        </div>
        <button onClick={(e) => handleExit(e)}>Exit Chat</button>
      </header>
      <div className='outputMessages'>
        <ul className='messageList'>
          {messages.map((message, i) => {
            if (message.user === 'login') {
              return (
                <li className='loginMessage' key={i}>
                  <p>{message.text}</p>
                </li>
              );
            }
            if (message.user === username) {
              console.log('same user!');
              return (
                <li className='message alignRight ownMessage' key={i}>
                  <p>{message.text}</p>
                </li>
              );
            }
            else {
              return (
                <li className='message alignLeft otherMessage' key={i}>
                  <p className='user'>{message.user}:</p>
                  <p>{message.text}</p>
                </li>
              );
            }
          })}
        </ul>
      </div>
      <div id='textForm' className='textForm'>
        <form onSubmit={(e) => handleTextInputSubmit(e)}>
          <textarea
            id='textMsg'
            className='textInput'
            value={textInput}
            onChange={(e) => handleTextInputChange(e)}
            required
          />
          <button className='textSendBut' type='submit'>
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
