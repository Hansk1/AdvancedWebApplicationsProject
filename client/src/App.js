import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// Import page components:
import SignIn from "./components/login";
import Register from "./components/register";
import SwipePage from "./components/swipePage";
import ChatPage from "./components/chatPage";
import ProfileSettingsPage from "./components/profileSettingsPage";

function App() {
    // Retrieve user data from the cookie
    const [userData, setUserData] = useState(() => {
        const userDataCookie = Cookies.get("user");
        return userDataCookie ? JSON.parse(userDataCookie) : null;
    });

    useEffect(() => {
        // Update user data when it changes in the cookie
        const userDataCookie = Cookies.get("user");
        setUserData(userDataCookie ? JSON.parse(userDataCookie) : null);
    }, []);

    // Define the ProtectedRoute component
    const ProtectedRoute = ({ children }) => {
        if (!userData || !userData.id || !userData.id.length > 0) {
            return <Navigate to="/login" replace />;
        }
        return children;
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <SwipePage setUserData={setUserData} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chat"
                        element={
                            <ProtectedRoute>
                                <ChatPage setUserData={setUserData} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute>
                                <ProfileSettingsPage
                                    setUserData={setUserData}
                                />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            !userData ||
                            !userData.id ||
                            !userData.id.length > 0 ? (
                                <SignIn />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            !userData ||
                            !userData.id ||
                            !userData.id.length > 0 ? (
                                <Register />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
