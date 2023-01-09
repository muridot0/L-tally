import { Routes, Route } from 'react-router-dom';
import DefaultPage from './components/DefaultPage/DefaultPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<DefaultPage />} />
      <Route path=':space' element={<DefaultPage />} />
    </Routes>
  );
}

export default App;
