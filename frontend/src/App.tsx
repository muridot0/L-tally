import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SpaceContext } from './contexts/space';
import DefaultPage from './Pages/DefaultPage/DefaultPage';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('');

  return (
    <SpaceContext.Provider value={{ activeMenuItem, setActiveMenuItem }}>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path=':space' element={<DefaultPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </SpaceContext.Provider>
  );
}

export default App;
