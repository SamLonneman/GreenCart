import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Register from "./pages/register";
import Questions from "./pages/questionairre";
import Login from "./pages/sigin";
import Profile from "./pages/user-profile";
import Home from "./pages/home";
import { useEffect } from "react";
 
export default function App() {
    useEffect(() => {
        document.title = "GreenCart"
     }, []);

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path ="/" element={<Navbar />} />
                <Route index 
                    element={<Home />}
                />
                <Route path="/sigin" element={<Login />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/questions" element={<Questions />} />
                <Route path="/Profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}
 
