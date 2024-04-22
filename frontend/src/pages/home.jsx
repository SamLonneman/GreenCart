import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import CSRFToken from './../components/CSRFToken';
import Cart from './../icons/cart.png';
import './pages.css';

const Home = () => {
  return (
    <div className="signin-form">
      <div className="center">
        <div className="custom-box center border-solid">
          <form style={{ padding: '30px', paddingBottom: '100px' }}>
            <CSRFToken />
            <img src={Cart} alt="GreenCart"/>
            <h1 className="center-text">GreenCart</h1>
            <h2>Reimagining sustainability, one goal at a time.</h2>
            <h4>Please log in or register to get started.</h4>
            <div className="form-group">
              <Link to="/login">
                <button className="custom-text btn button">Log In</button>
              </Link>
            </div>
            <p className="custom-text">or</p>
            <div className="form-group">
              <Link to="/register">
                <button className="custom-text btn button">Register</button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Home;