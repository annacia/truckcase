import React from 'react';
import Routes from './Routes';
import Header from './components/Header';
import Footer from './components/Footer';

import './App.styl';

function App() {
  return (
    <>
      <Header/>
      <main id="main">
        <Routes />
      </main>
      <Footer/>
    </>
  );
}

export default App;