import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';
import Admin from './Pages/Admin';
import Header from './Components/Header';
import Cart from './Pages/Cart';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Detail from './Pages/Detail';
import Footer from './Pages/Footer';

function App() {

  const [authen, setAuthen] = useState(false)
  const [user, setUser] = useState('')

  return (
    <div className="App">
      <Header authen={authen} setAuthen={setAuthen} user={user} setUser={setUser} />
      <Routes>
        <Route path='/login' element={<Login authen={authen} setAuthen={setAuthen} user={user} setUser={setUser} />} />
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/detail/:id' element={<Detail />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
