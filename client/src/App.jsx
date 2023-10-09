import { BrowserRouter, Routes, Route } from "react-router-dom";

import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Navbar from "./layouts/Navbar";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AdminProducts from "./pages/admin/Products";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Navbar />
        <main className="flex-shrink-0 d-flex flex-column min-vh-100">
          <div className="container mt-2 mb-5">
            <Routes>
              <Route path="/" element=<Home /> />
              <Route path="/about" element=<About /> />
              <Route path="/cart" element=<Cart /> />
              <Route path="/contact" element=<Contact /> />
              <Route path="/login" element=<Login /> />
              <Route path="/products" element=<Products /> />
              <Route path="/products/:id" element=<ProductDetail /> />
              <Route path="/admin/products" element=<AdminProducts /> />
              <Route path="*" element=<ErrorPage /> />
            </Routes>
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
