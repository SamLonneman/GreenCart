import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";
 
const Navbar = () => {
    return (
        <>
            <Nav>
                <Bars />
 
                <NavMenu>
                    <NavLink to="/" >
                        Home
                    </NavLink>
                    <NavLink to="/register" activeStyle>
                        Register
                    </NavLink>
                    <NavLink to="/questionairre" activeStyle>
                        Questionaire
                    </NavLink>
                    <NavLink to="/user-profile" activeStyle>
                        User Profile
                    </NavLink>
                    <NavLink to="/product-search" activeStyle>
                        Product Search
                    </NavLink>
                    {/* Second Nav */}
                    {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
                </NavMenu>
                <NavBtn>
                    <NavBtnLink to="/sigin">
                        Sign In
                    </NavBtnLink>
                </NavBtn>
            </Nav>
        </>
    );
};
 
export default Navbar;