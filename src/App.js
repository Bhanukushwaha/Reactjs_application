import React from 'react'
import Home from './Features/Home';
import About from './Features/About';
import Product from './Features/Product';
import Login from './Component/Login';
import Signup from './Component/Signup';
import Editstudent from './assets/Editstudent'
import NavBar from './NavBar';
import Selider from './Selider';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import StudentCreate from './Features/StudentCreate';
function App() {
  return (
    <BrowserRouter>
      <header>
      <NavBar/> 
      </header>
      <Routes>
        <Route path="/" element={<Selider />} />
        <Route path="/home" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/studentCreate" element={<StudentCreate />} />
        <Route path="/editstudent/:id" element={<Editstudent />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
