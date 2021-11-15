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

  //socket makes connection regardless of view - need to make changes so that connection only occurs after username is entered.
  return (
    <div id='chatBox'>
      {username ? (
        <SocketContext.Provider value={socket}>
          <Chat username={username} />
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
    <div id='chat'>
      <header className='chatHeader'>
        <div>
          <h2>Chat Room for Class ______</h2>
          <p>You are signed in as: {username}</p>
        </div>
        <button>Exit Chat</button>
      </header>
      <div className='outputMessages'>
        <ul className='messageList'>
          {messages.map((message, i) => {
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
