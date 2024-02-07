import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Navigate } from "react-router-dom";

//Import pag components:
import SignIn from "./components/login";
import Register from "./components/register";
import SwipePage from "./components/swipePage";
import ChatPage from "./components/chatPage";
import ProfileSettingsPage from "./components/profileSettingsPage";
import TopBar from "./components/TopBar";

function App() {
    //TODO: Add a way to store the jwt as an http cookie:
    const [jwt, setJwt] = useState("");
    const [user, setUser] = useState({});

    const ProtectedRoute = ({ user, children }) => {
        if (!user?.id?.length > 0) {
            return <Navigate to="/login" replace></Navigate>;
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
                            <ProtectedRoute user={user}>
                                <SwipePage jwt={jwt} user={user} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/chat"
                        element={
                            <ProtectedRoute user={user}>
                                <ChatPage />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/settings"
                        element={
                            <ProtectedRoute user={user}>
                                <ProfileSettingsPage user={user} jwt={jwt} />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            !user?.id?.length > 0 ? (
                                <SignIn setJwt={setJwt} setUser={setUser} />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            !user?.id?.length > 0 ? (
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
