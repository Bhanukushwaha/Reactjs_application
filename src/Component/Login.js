import React, { useState } from 'react';
import './Login.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signinUser } from './AuthContext'; // Move this import to the top

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const {user_data, loading, message} = useSelector(state => state.auth)
  // let current_user = localStorage.getItem('login_user');
  // const user1 = JSON.parse(current_user);
  const authenticate = (e) => {
    e.preventDefault(); // Prevent the default form submission
    dispatch(signinUser({ user: { email, password } }));
  };
  return (
    <>
      {
        user_data !== null &&
        (user_data ? (
          <h1>{navigate("/")}</h1>
        ) : (
          <h1>{navigate("/Login")}</h1>
        ))
      }
      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          {
            message &&
            <h5>{message}</h5>
          }
          <form>
            <div className="input-group">
              <label>Email</label>
              <input
                placeholder="Enter your email"
                value={email}
                onChange={text => setEmail(text.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={text => setPassword(text.target.value)}
                required
              />
            </div>
            <button type="submit" onClick={authenticate} className="login-button">
              {loading ? 'Logging in...' : 'Login'}
            </button>
            <Link to="/Signup" className='nav-link'>Signup</Link>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
