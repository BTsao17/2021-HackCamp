import React, { useState, useEffect } from 'react';
import './App.css';
import { ChatBox, ClassList, CodeEditor } from './components';

function App() {
  return (
    <React.Fragment>
      <header className="pageHeader">
        <h1>App Name</h1>
      </header>
      <main className="app">
        <ClassList />
        <CodeEditor />
        <ChatBox />
      </main>
    </React.Fragment>
  );
}

export default App;
