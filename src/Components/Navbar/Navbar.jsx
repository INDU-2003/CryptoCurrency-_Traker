import React, { useContext, useState } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import arrow_icon from '../../assets/arrow_icon.png'
import { CoinContext } from '../../Context/CoinContext'
import { useAuth } from '../../Context/AuthContext'
import { Link } from 'react-router-dom'
import Login from '../Auth/Login'
import Signup from '../Auth/Signup'


const Navbar = () => {
  const { setCurrency } = useContext(CoinContext)
  const { user, isAuthenticated, logout } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('signup') // 'signup' or 'login'





  const currencyHandler = (event) => {
    switch (event.target.value) {

      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "usd", symbol: "€" });
        break;
      }

      case "inr": {
        setCurrency({ name: "usd", symbol: "₹" });
        break;
      }
      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  }

  const handleAuthClick = () => {
    if (isAuthenticated) {
      logout()
    } else {
      setAuthMode('signup')
      setShowAuthModal(true)
    }
  }

  const handleLoginClick = () => {
    setAuthMode('login')
    setShowAuthModal(true)
  }

  const closeAuthModal = () => {
    setShowAuthModal(false)
  }

  const switchToLogin = () => {
    setAuthMode('login')
  }

  const switchToSignup = () => {
    setAuthMode('signup')
  }


return (
  <div className='navbar'>
    <Link to={'/'}>
    <img src={logo} alt=' ' className='logo' />
    </Link>
    <ul>
      <Link to={'/'}><li>Home</li></Link>
      <li>Features</li>
      <li>pricing</li>
      <li>Blog</li>
    </ul>
    <div className='nav-right'>
      <select onChange={currencyHandler}>
        <option value="usd">USD</option>
        <option value="eur">EUR</option>
        <option value="inr">INR</option>
      </select>
      {isAuthenticated ? (
        <div className="user-section">
          <span className="user-name">Hi, {user?.name}</span>
          <button onClick={handleAuthClick} className="logout-btn">
            Logout <img src={arrow_icon} alt='arrow'/>
          </button>
        </div>
      ) : (
        <div className="auth-buttons">
          <button onClick={handleLoginClick} className="login-btn">
            Login
          </button>
          <button onClick={handleAuthClick} className="signup-btn">
            Sign up <img src={arrow_icon} alt='arrow'/>
          </button>
        </div>
      )}
    </div>

    {showAuthModal && (
      <>
        {authMode === 'login' ? (
          <Login onSwitchToSignup={switchToSignup} onClose={closeAuthModal} />
        ) : (
          <Signup onSwitchToLogin={switchToLogin} onClose={closeAuthModal} />
        )}
      </>
    )}


  </div>
)
}

export default Navbar