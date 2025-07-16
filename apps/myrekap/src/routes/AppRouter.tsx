import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "@/components/templates/ProtectedRoute";
import { AdminCreatePage, AdminEditPage, AdminPage } from "@/pages/users/admin";
import { CustomerPage } from "@/pages/users/customer";
import { OrderCreatePage, OrderDetailPage, OrderEditPage, OrderPage, OrderReceiptPreview } from "@/pages/orders";
import { ProductCreatePage, ProductDetailPage, ProductEditPage, ProductPage } from "@/pages/products";
import { ReportOrderFilterPage, ReportOrderResultPage } from "@/pages/reports";
import { LoginPage } from "@/pages/auth";
import { DashboardPage } from "@/pages/dashboard";

function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login" replace />} />

                <Route path="/auth">
                    <Route path="login" element={<LoginPage />} />
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
                        <Route path="orders" element={<ReportOrderFilterPage />} />
                        <Route path="orders/result" element={<ReportOrderResultPage />} />
                    </Route>

                    <Route path="/products/">
                        <Route index element={<ProductPage />} />
                        <Route path=":id" element={<ProductDetailPage />} />
                        <Route path=":id/edit" element={<ProductEditPage />} />
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
