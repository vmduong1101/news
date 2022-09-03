import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import Admin from './Pages/Admin';
import Header from './Components/Header';
import Cart from './Pages/Cart';
import { useSelector } from 'react-redux';

function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/cart' element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
