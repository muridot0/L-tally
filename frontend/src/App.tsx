import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { SpaceContext } from './contexts/space';
import DefaultPage from './Pages/DefaultPage/DefaultPage';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { LoginContext, User } from './contexts/login';
import SignUp from './Pages/Login/Signup';
import { AuthService } from './services/auth-service';
import AuthVerify from "./common/AuthVerify"

function App() {
  const [activeMenuItem, setActiveMenuItem] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  function logOut() {
    AuthService.logout();
  }

  return (
    <LoginContext.Provider value={{ user, setUser, loggedIn, setLoggedIn }}>
      <SpaceContext.Provider value={{ activeMenuItem, setActiveMenuItem }}>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/:space' element={<DefaultPage />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <AuthVerify logOut={logOut} />
      </SpaceContext.Provider>
    </LoginContext.Provider>
  );
}

export { type User };
export default App;
