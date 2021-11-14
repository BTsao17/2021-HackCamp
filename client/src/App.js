import React, { useState, useEffect } from 'react';
import './App.css';
import { ChatBox, ClassList, CodeEditor } from './components';

function App() {
  return (
    <React.Fragment>
      <header class="pageHeader">
        <h1>App Name</h1>
      </header>
      <main class="app">
        <ClassList />
        <CodeEditor />
        <ChatBox />
      </main>
    </React.Fragment>
  );
}

export default App;
