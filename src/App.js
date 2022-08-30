import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App h-screen">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
