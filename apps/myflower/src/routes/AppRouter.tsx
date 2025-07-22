import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import Login from "@/pages/auth/LoginPage";
import Register from "@/pages/auth/RegisterPage";
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
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                </Route>

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
                    <Route path="payment-success" element={<PaymentSuccessPage />} />
                    <Route path="payment-failed" element={<PaymentFailedPage />} />
                </Route>

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
