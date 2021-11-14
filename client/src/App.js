import React, { useState, useEffect } from 'react';
import './App.css';
import { ChatBox, ClassList, CodeEditor } from './components';

function App() {
  return (
    <React.Fragment>
      <header>
        <h1>2021 HackCamp</h1>
      </header>
      <main>
        <ClassList />
        <CodeEditor />
        <ChatBox />
      </main>
    </React.Fragment>
  );
}

export default App;
