import React, { Fragment } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import logout_icon from '../../icons/logout.png';

const navbar = ({ isAuthenticated, logout }) => {
    const authLinks = (
        <Fragment>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/user-profile'>User Profile</NavLink>
            </li>
            <li className='nav-item'>
                <a className='nav-link' onClick={logout} href='#!'><img className="logout" src={logout_icon} alt="Logout Icon" /></a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/login'>Login</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/register'>Register</NavLink>
            </li>
            <li className='nav-item'>
                <NavLink className='nav-link' to='/product-search'>Product Search</NavLink>
            </li>
        </Fragment>
    );

    return (
        <nav className='navbar navbar-expand-lg navbar-light bg-light'>
            <div className='container-fluid'>
                <Link className='navbar-brand' exact to='/'>GreenCart</Link>
                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarNav'
                    aria-controls='navbarNav'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav'>
                        <li className='nav-item'>
                            <NavLink className='nav-link' exact to='/'>Home</NavLink>
                        </li>
                        {isAuthenticated ? authLinks : guestLinks}
                    </ul>
                </div>
            </div>

        </nav>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { logout })(navbar);