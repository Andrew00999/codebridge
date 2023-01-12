import React from 'react';
import Home from './pages/Home';

import { Route, Routes } from 'react-router-dom';
import CardDetail from './pages/CardDetail';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/details/:id' element={<CardDetail />} />
    </Routes>
  );
}

export default App;
