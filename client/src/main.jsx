import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import NavbarComponent from './components/Navbar';
import HomeComponent from './pages/Home';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
import ProductCardComponent from './components/ProductCard';
import ProductDetailComponent from './components/ProductDetail';

const router = createBrowserRouter([
  {
    path: "/login",
    element: 
    <>
      <LoginComponent />
    </>
  },
  {
    path: "/register",
    element: 
    <>
      <RegisterComponent />
    </>
  },
  {
    path: "/",
    element: 
    <>
      <NavbarComponent />
    </>
  },
  {
    path: "/product",
    element: 
    <>
      <NavbarComponent />
      <ProductCardComponent />
    </>
  },
  {
    path: "/product/:id",
    element: 
    <>
      <NavbarComponent />
      <ProductDetailComponent />
    </>
  },
  {
    path: "/cart",
    element: 
    <>
      <NavbarComponent />
      <h1>User Cart Page</h1>
    </>
  },
  {
    path: "/product-list",
    element: 
    <>
      <h1>Product CMS Page</h1>
    </>
  },
  {
    path: "/product-list/add",
    element: 
    <>
      <h1>Product Add Page</h1>
    </>
  },
  {
    path: "/product-list/update",
    element: 
    <>
      <h1>Product Update Page</h1>
    </>
  },
  {
    path: "/about",
    element: 
    <>
      <NavbarComponent />
      <h1>About us Page</h1>
    </>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
