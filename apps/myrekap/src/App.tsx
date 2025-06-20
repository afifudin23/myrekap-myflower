import ProtectedRoute from "@/components/templates/ProtectedRoute";
import AddOrder from "@/pages/AddOrder";
import AddUser from "@/pages/AddUser";
import Administrator from "@/pages/Administrator";
import Beranda from "@/pages/Beranda";
import PrintSummary from "@/pages/PrintSummary";
import LoginPage from "@/pages/LoginPage";
import OrderSummary from "@/pages/OrderSummary";
import ReceiptPreview from "@/pages/ReceiptViewer";
import ReportOrder from "@/pages/ReportOrder";
import UpdateOrder from "@/pages/UpdateOrder";
import UpdateUser from "@/pages/UpdateUser";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductPage from "@/pages/products/ProductPage";
import CustomerPage from "@/pages/CustomerPage";
import ProductDetailPage from "@/pages/products/ProductDetailPage";
import ProductEditPage from "@/pages/products/ProductEditPage";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />

                    <Route element={<ProtectedRoute />}>
                        <Route path="/beranda/" element={<Beranda />} />
                        <Route path="/order-summary/:id" element={<OrderSummary />} />
                        <Route path="/order-summary/edit/:id" element={<UpdateOrder />} />
                        <Route path="/order-summary/receipt/:id" element={<ReceiptPreview />} />
                        <Route path="/order-summary/print" element={<PrintSummary />} />
                        <Route path="/order-summary/print/report" element={<ReportOrder />} />
                        <Route path="/input-order/" element={<AddOrder />} />
                        <Route path="/products/">
                            <Route index element={<ProductPage />} />
                            <Route path=":id" element={<ProductDetailPage />} />
                            <Route path=":id/edit" element={<ProductEditPage />} />
                        </Route>
                        <Route path="/customers/" element={<CustomerPage />} />
                        <Route path="/administrator/" element={<Administrator />} />
                        <Route path="/administrator/add" element={<AddUser />} />
                        <Route path="/administrator/edit/:id" element={<UpdateUser />} />
                    </Route>

                    <Route path="*" element={<h1>Not Found</h1>} />
                </Routes>
            </Router>
        </>
    );
}

export default App;
