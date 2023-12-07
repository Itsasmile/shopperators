import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Cart from "./pages/Cart";
import Category from "./pages/Category";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Layout from "./Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ShoppingList from "./pages/ShoppingList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/:id",
    element: <Product />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/c/:id",
    element: <Category />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/shoppinglist",
    element: <ShoppingList />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </React.StrictMode>
);
