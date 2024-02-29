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
 
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Register />} />
                <Route path="/questions" element={<Questions />} />
                <Route
                    path="/Login"
                    element={<Login />}
                />
                <Route path="/Profile" element={<Profile />} />
            </Routes>
        </Router>
    );
}
 
export default App;
