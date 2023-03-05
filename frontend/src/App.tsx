import { Routes, Route } from 'react-router-dom';
import { SpaceProvider } from './contexts/space';
import DefaultPage from './Pages/DefaultPage/DefaultPage';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import { LoginProvider, User } from './contexts/login';
import SignUp from './Pages/Login/Signup';
import { AuthService } from './services/auth-service';
import AuthVerify from './common/AuthVerify';

function App() {
  const logOut = () => {
    AuthService.logout();
  };

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
