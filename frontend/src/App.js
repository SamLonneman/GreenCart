import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Register from "./pages/register";
import Layout from "./hocs/layout";
import Questions from "./pages/questionairre";
import Login from "./pages/login";
import Profile from "./pages/user-profile";
import Home from "./pages/home";
import ProductSearch from "./pages/product-search";
import Forgotpassword from "./pages/forgotpassword";
import { useEffect } from 'react';

import { Provider } from 'react-redux';
import store from './store';

export default function App() {
    useEffect(() => {
        document.title = "GreenCart"
     }, []);

    return (
        <Provider store={store}>

        <Router>
            <Layout>
            <Routes>
                <Route index 
                    element={<Home />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/user-profile" element={<Profile />} />
                <Route path="/product-search" element={<ProductSearch />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
            </Layout>
        </Router>
        </Provider>
    );
}
