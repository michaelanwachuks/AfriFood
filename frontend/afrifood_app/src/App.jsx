import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import NavigationBar from './components/NavigationBar'
import Home from './components/Home'
import Menu from './components/Menu'
import About from './components/About'
import FAQ from './components/FAQ'
import Contact from './components/Contact'

function App() {
  
  return (
    <BrowserRouter>
    
        <NavigationBar />
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
       
    </BrowserRouter>
  )
}

export default App
