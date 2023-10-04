import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Stack from "react-bootstrap/Stack";

import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/:id",
    element: <ProductDetail />,
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <div className="d-flex flex-column h-100">
      <Stack gap={3}>
        <Navbar />
        <main className="flex-shrink-0 vh-100">
          <div className="container">
            <RouterProvider router={router} />
          </div>
        </main>
        <Footer />
      </Stack>
    </div>
  );
}

export default App;
