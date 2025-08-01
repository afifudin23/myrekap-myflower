import ProtectedRoute from "@/components/templates/ProtectedRoute";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import Login from "@/pages/auth/LoginPage";
import Register from "@/pages/auth/RegisterPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import VerifyEmailPage from "@/pages/auth/VerifyEmailPage";
import CartPage from "@/pages/carts/CartPage";
import OrderCheckoutPage from "@/pages/orders/OrderCheckoutPage";
import OrderDetailPage from "@/pages/orders/OrderDetailPage";
import OrdersPage from "@/pages/orders/OrderPage";
import PaymentFailedPage from "@/pages/orders/PaymentFailedPage";
import PaymentSuccessPage from "@/pages/orders/PaymentSuccessPage";
import ProductDetailPage from "@/pages/products/ProductDetailPage";
import ProductsPage from "@/pages/products/ProductPage";
import ProfilePage from "@/pages/profiles/ProfilePage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login" replace />} />

                <Route path="/auth">
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="verify-email" element={<VerifyEmailPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="reset-password" element={<ResetPasswordPage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="/products">
                        <Route index element={<ProductsPage />} />
                        <Route path=":id" element={<ProductDetailPage />} />
                    </Route>

                    <Route path="/carts" element={<CartPage />} />
                    <Route path="/profile" element={<ProfilePage />} />

                    <Route path="/orders">
                        <Route index element={<OrdersPage />} />
                        <Route path=":id" element={<OrderDetailPage />} />
                        <Route path="checkout" element={<OrderCheckoutPage />} />
                    </Route>
                </Route>
                <Route path="/orders">
                    <Route path="payment-success" element={<PaymentSuccessPage />} />
                    <Route path="payment-failed" element={<PaymentFailedPage />} />
                </Route>
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
