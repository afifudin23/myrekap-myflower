import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/templates/ProtectedRoute";
import { AdminCreatePage, AdminEditPage, AdminPage } from "@/pages/users/admin";
import { CustomerPage } from "@/pages/users/customer";
import { OrderCreatePage, OrderDetailPage, OrderEditPage, OrderPage, OrderReceiptPreview } from "@/pages/orders";
import {
    ProductPage,
    ProductCreatePage,
    ProductDetailPage,
    ProductEditPage,
    ProductManageStockPage,
} from "@/pages/products";
import {
    ReportPage,
    ReportOrderFilterPage,
    ReportOrderResultPage,
    ReportProductStockFilterPage,
    ReportProductStockResultPage,
} from "@/pages/reports";
import { LoginPage } from "@/pages/auth";
import { DashboardPage } from "@/pages/dashboard";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import ForgotPasswordPage from "@/pages/auth/ForgotPasswordPage";
import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login" replace />} />

                <Route path="/auth">
                    <Route path="login" element={<LoginPage />} />
                    <Route path="verify-email" element={<VerifyEmailPage />} />
                    <Route path="forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="reset-password" element={<ResetPasswordPage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard">
                        <Route index element={<DashboardPage />} />
                    </Route>

                    <Route path="/orders">
                        <Route index element={<OrderPage />} />
                        <Route path="create" element={<OrderCreatePage />} />
                        <Route path=":id" element={<OrderDetailPage />} />
                        <Route path=":id/edit" element={<OrderEditPage />} />
                        <Route path=":id/receipt" element={<OrderReceiptPreview />} />
                    </Route>

                    <Route path="/reports">
                        <Route index element={<ReportPage />} />
                        <Route path="orders">
                            <Route index element={<ReportOrderFilterPage />} />
                            <Route path="result" element={<ReportOrderResultPage />} />
                        </Route>

                        <Route path="products">
                            <Route index element={<ReportProductStockFilterPage />} />
                            <Route path="result" element={<ReportProductStockResultPage />} />
                        </Route>
                    </Route>

                    <Route path="/products/">
                        <Route index element={<ProductPage />} />
                        <Route path=":id" element={<ProductDetailPage />} />
                        <Route path=":id/edit" element={<ProductEditPage />} />
                        <Route path=":id/manage-stock" element={<ProductManageStockPage />} />
                        <Route path="create" element={<ProductCreatePage />} />
                    </Route>

                    <Route path="/users">
                        <Route path="customer">
                            <Route index element={<CustomerPage />} />
                        </Route>

                        <Route path="admin">
                            <Route index element={<AdminPage />} />
                            <Route path="create" element={<AdminCreatePage />} />
                            <Route path=":id/edit" element={<AdminEditPage />} />
                        </Route>
                    </Route>
                </Route>

                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default AppRouter;
