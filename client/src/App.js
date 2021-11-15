import React, { useState, useEffect } from 'react';
import './App.css';
import { ChatBox, ClassList, CodeEditor } from './components';

function App() {
  return (
    <React.Fragment>
      <header className="pageHeader">
        <h1 className='title'>CS-Helper</h1>
        <p className='tagline'>Created by Bonnie Tsao, Patrick Gousseau and Aysath Rukshana for nwPlus HackCamp 2021</p>
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
