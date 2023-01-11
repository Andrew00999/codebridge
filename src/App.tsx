import React from 'react';
import Home from './pages/Home';
import cl from './App.module.scss';

import { Route, Routes } from 'react-router-dom';
import CardDetail from './pages/CardDetail';

function App() {
  return (
    <div className={cl.container}>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/details/:id' element={<CardDetail />} />
      </Routes>
    </div>
  );
}

export default App;
