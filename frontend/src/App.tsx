import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SpaceContext } from './contexts/space';
import DefaultPage from './Pages/DefaultPage/DefaultPage';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { LoginContext, User } from './contexts/login';

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [user, setUser] = useState<User | null>(null);

  async function login(user: User | null) {
    setUser(user);
  }

  return (
    <LoginContext.Provider value={{user, setUser}}>
      <SpaceContext.Provider value={{ activeMenuItem, setActiveMenuItem }}>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path=':space' element={<DefaultPage />} />
          </Route>
          <Route path='/login' element={<Login login={login} />} />
        </Routes>
      </SpaceContext.Provider>
    </LoginContext.Provider>
  );
}

export { type User };
export default App;
