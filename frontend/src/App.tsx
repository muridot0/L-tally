import { Routes, Route, useNavigate } from 'react-router-dom';
import { SpaceProvider } from './contexts/space';
import DefaultPage from './Pages/DefaultPage/DefaultPage';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { LoginProvider, User } from './contexts/login';
import SignUp from './Pages/Login/Signup';
import { AuthService } from './services/auth-service';
import AuthVerify from './common/AuthVerify';
import { useCallback, useEffect } from 'react';
import { useIdleTimer } from 'react-idle-timer';

function App() {
  const navigate = useNavigate()

  const logOut = useCallback(() => {
    AuthService.logout();
    navigate('/login')
  }, [navigate]);

  const onIdle = useCallback(() => {
    logOut()
  }, [logOut])

  const isIdle  = useIdleTimer({timeout: 1000 * 60 * 20, onIdle})

  useEffect(() => {
    const interval = setInterval(() => {
      if(isIdle.isIdle()){
        onIdle()
      }
      console.log(isIdle.getLastActiveTime())
    }, 1000 * 60 * 20)
    return () => {
      clearInterval(interval)
    }
  }, [isIdle, onIdle])

  return (
    <SpaceProvider>
      <LoginProvider>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route path='/:space' element={<DefaultPage />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <AuthVerify logOut={logOut} />
      </LoginProvider>
    </SpaceProvider>
  );
}

export { type User };
export default App;
