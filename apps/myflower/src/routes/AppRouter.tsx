import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import Login from "@/pages/auth/LoginPage";
import Register from "@/pages/auth/RegisterPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login" replace />} />

                <Route path="/auth">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                </Route>

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
