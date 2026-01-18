import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react'
import Login from './Pages/Login.jsx'
import Register from './Pages/Register.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Function to validate login credentials
  const validateLogin = (email, password) => {
    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const user = registeredUsers.find(
      (u) => u.email === email && u.password === password
    );
    return user;
  };

  // Function to handle login
  const handleLoginSuccess = (email, password) => {
    const user = validateLogin(email, password);
    if (user) {
      setCurrentUser(user);
      setIsLoggedIn(true);
    }
    return user;
  };

  return (
    <div>
      {isLoggedIn ? (
        <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px", textAlign: "center" }}>
          <h2>Welcome, {currentUser?.name}!</h2>
          <p style={{ fontSize: "1em", color: "#646cff", marginBottom: "30px" }}>
            You are successfully logged in
          </p>
          
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setShowLogin(false);
              setCurrentUser(null);
            }}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#cb0404",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1em",
              fontWeight: "600"
            }}
          >
            Logout
          </button>
          
          <button
            onClick={() => {
              setIsLoggedIn(false);
              setShowLogin(false);
              setCurrentUser(null);
            }}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              backgroundColor: "#0f046f",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "1em",
              fontWeight: "600"
            }}
          >
            Register Another Account
          </button>
        </div>
      ) : showLogin ? (
        <div>
          <Login onLogin={handleLoginSuccess} />
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Don't have an account?{' '}
            <button
              onClick={() => setShowLogin(false)}
              style={{
                background: "none",
                border: "none",
                color: "#646cff",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "1em"
              }}
            >
              Register here
            </button>
          </p>
        </div>
      ) : (
        <div>
          <Register onRegister={() => setShowLogin(true)} />
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Already have an account?{' '}
            <button
              onClick={() => setShowLogin(true)}
              style={{
                background: "none",
                border: "none",
                color: "#646cff",
                cursor: "pointer",
                textDecoration: "underline",
                fontSize: "1em"
              }}
            >
              Login here
            </button>
          </p>
        </div>
      )}
    </div>
  );
}

export default App