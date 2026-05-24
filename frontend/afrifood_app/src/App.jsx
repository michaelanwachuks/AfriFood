import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import './App.css'
import NavigationBar from './components/NavigationBar'
import Home from './pages/Home'
import Menu from './pages/Menu'
import About from './pages/About'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Register from './pages/Register'
import Login from './pages/Login'
import OrderConfirmation from './pages/OrderConfirmation'
import AdminDashboard from './components/AdminDashboard'
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={
            <ProtectedRoute><Cart /></ProtectedRoute>
          } />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/order-confirmation" element={
            <ProtectedRoute><OrderConfirmation /></ProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminRoute><AdminDashboard /></AdminRoute>
          } />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
