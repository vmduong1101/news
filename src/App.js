import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import Admin from './Pages/Admin';

function App() {

  return (
    <div className="App h-screen">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
