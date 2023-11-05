import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AdminProducts from "./pages/admin/Products";
import AddProduct from "./pages/admin/AddProduct";
import EditProduct from "./pages/admin/EditProduct";
import Checkout from "./pages/Checkout";
import { AdminRoute, PrivateRoute } from "./components/Routes";
import { CheckoutPageStatus } from "./components/CheckoutStatus";
import Dashboard from "./pages/admin/Dashboard";
import Layout from "./layouts/Layout";
import AdminLayout from "./layouts/AdminLayout";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/success" element={<CheckoutPageStatus />} />
            <Route
              path="/checkout/failed"
              element={
                <CheckoutPageStatus
                  type="failure"
                  msg="Something went wrong. Try Again"
                  msgHeader="Transaction Failed"
                />
              }
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/login"
              element={
                <PrivateRoute>
                  <Login />
                </PrivateRoute>
              }
            />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route
              path="/admin/dashboard"
              element={
                <AdminRoute role="admin">
                  <Dashboard />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <AdminRoute role="admin">
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/add"
              element={
                <AdminRoute role="admin">
                  <AddProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/products/:id"
              element={
                <AdminRoute role="admin">
                  <EditProduct />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <AdminRoute role="admin">
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminRoute role="admin">
                  <AdminProducts />
                </AdminRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <AdminRoute role="admin">
                  <AdminProducts />
                </AdminRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
