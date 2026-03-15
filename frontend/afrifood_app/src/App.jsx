import { BrowserRouter, Routes, Route } from 'react-router-dom';
 import {CartProvider}  from "./components/CartContext";
import './App.css'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import Menu from './components/Menu'
import About from './components/About'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Cart from './components/Cart'
import Login from './components/Login'
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './components/Footer';
import CartContext from './components/CartContext';


 

function App() {
  
  return (
      <CartProvider >
        
    <BrowserRouter>
    
        <NavigationBar />
       
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        <Footer/>
    </BrowserRouter>
    </CartProvider>
  )
}

export default App
