import React, { useState,useEffect  } from 'react';
import './Login.css'; // Import the CSS file for styling
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector  } from 'react-redux'; // UseSelector isn't used, so you can remove it
import { signupUser } from './AuthContext'; // Move this import to the top

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setConformPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user_data, loading, message} = useSelector(state => state.auth)
  const authenticate = () => {
    dispatch(signupUser({ user: { email, password, password_confirmation } }));
  };

  // let current_user = localStorage.getItem('login_user');
  // const user_singup = JSON.parse(current_user);

  useEffect(() => {
    if (user_data) {
      navigate('/');
    } else {
      navigate('/Signup');
    }
  }, [user_data, navigate]);
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Signup</h2>
        {
          message &&
          <h5>{message}</h5>
        }
        <form>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(text) => setEmail(text.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(text) => setPassword(text.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password_confirmation"
              placeholder="Confirm your password"
              value={password_confirmation}
              onChange={(text) => setConformPassword(text.target.value)}
              required
            />
          </div>
          <button type="submit" onClick={(e) => {e.preventDefault();authenticate(); }} className="login-button">{loading ? 'Singing in...' : 'Signup'}</button>
          <Link to="/Login" className="nav-link">Login</Link>
        </form>
      </div>
    </div>
  );
}
export default Signup;
