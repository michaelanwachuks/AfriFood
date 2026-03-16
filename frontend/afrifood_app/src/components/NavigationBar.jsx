import './NavigationBar.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'


const NavigationBar = () => {
  const { total } = useContext(CartContext);

  return (
    <div>
<nav  className='navigationbar_style'>
  <ul >
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/about">About Us</Link></li>
        <li><Link to="/faq">FAQ</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/login">Login</Link></li>
  </ul>
</nav>
    </div>
  )
}

export default NavigationBar