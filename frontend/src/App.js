import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Register from "./pages/user_auth/register";
import Layout from "./hocs/layout";
import Questions from "./pages/user_only/questions";
import Login from "./pages/user_auth/login";
import Profile from "./pages/user_only/user-profile";
import Home from "./pages/home";
import ProductSearch from "./pages/user_only/product-search";
import Forgotpassword from "./pages/user_auth/forgotpassword";
import SetProfile from "./pages/user_only/setProfile";
import { useEffect } from 'react';
import {ConfigProvider} from 'antd';

import { Provider } from 'react-redux';
import store from './store';

import Tasks from "./pages/tasks";

export default function App() {
    useEffect(() => {
        document.title = "GreenCart"
     }, []);

    document.body.style.background = "#edf8f4";

    return (
        <ConfigProvider
            // theme={{
            //     token: {
            //         colorPrimary :'#36c15b',
            //         borderRadius: 5,
            //         colorBgContainer: '#f6ffed',
            //     },
            // }}
        >
        <Provider store={store}>

        <Router>
            <Layout>
            <Routes>
                <Route index 
                    element={<Home />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/user-profile" element={<Profile />} />
                <Route path="/product-search" element={<ProductSearch />} />
                <Route path="/questions" element={<Questions />} />
                {/* <Route path ="/taskgenerate" element={<TaskGenerate />} />
                <Route path ="/tasklist" element={<TaskList />} /> */}
                <Route path="/setprofile" element={<SetProfile />} />
                <Route path ="/tasks" element={<Tasks />} />
                <Route path="*" element={<h1>Page Not Found</h1>} />
            </Routes>
            </Layout>
        </Router>
        </Provider>
        </ConfigProvider>
    );
}
