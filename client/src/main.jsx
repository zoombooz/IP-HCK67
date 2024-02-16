import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import NavbarComponent from './components/Navbar';
import HomeComponent from './pages/Home';
import LoginComponent from './components/Login';
import RegisterComponent from './components/Register';
import ProductCardComponent from './components/ProductCard';
import ProductDetailComponent from './components/ProductDetail';
import ProductFormComponent from './components/ProductForm';
import CartComponent from './components/Cart';


const router = createBrowserRouter([
  {
    path: "/login",
    element: 
    <>
      <LoginComponent />
    </>,
    loader : async () => {
      if(localStorage.getItem("access_token")){
        throw redirect("/")
    }
    return null
    }
  },
  {
    path: "/register",
    element: 
    <>
      <RegisterComponent />
    </>,
    loader : async () => {
      if(localStorage.getItem("access_token")){
        throw redirect("/")
    }
    return null
    }
  },
  {
    path: "/",
    element: 
    <>
      <NavbarComponent />
      <ProductCardComponent />
    </>,
    loader : async () => {
      if(!localStorage.getItem("access_token")){
        throw redirect("/login")
    }
    return null
    }
  },
  {
    path: "/product/:id",
    element: 
    <>
      <NavbarComponent />
      <ProductDetailComponent />
    </>,
    loader : async () => {
      if(!localStorage.getItem("access_token")){
        throw redirect("/login")
    }
    return null
    }
  },
  {
    path: "/cart",
    element: 
    <>
      <NavbarComponent />
      <CartComponent />
    </>,
    loader : async () => {
      if(!localStorage.getItem("access_token")){
        throw redirect("/login")
    }
    return null
    }
  },
  {
    path: "/product-list",
    element: 
    <>
      <h1>Product CMS Page</h1>
    </>,
    loader : async () => {
      if(!localStorage.getItem("access_token")){
        throw redirect("/login")
    }
    return null
    }
  },
  {
    path: "/product-list/add",
    element: 
    <>
      <NavbarComponent />
      <ProductFormComponent />
    </>,
    loader : async () => {
      if(!localStorage.getItem("access_token")){
        throw redirect("/login")
    }
    return null
    }
  },
  {
    path: "/product-list/:id/update",
    element: 
    <>
      <NavbarComponent />
      <ProductFormComponent />
    </>,
    loader : async () => {
      if(!localStorage.getItem("access_token")){
        throw redirect("/login")
    }
    return null
    }
  },
  {
    path: "/about",
    element: 
    <>
      <NavbarComponent />
      <h1>About us Page</h1>
    </>,
    loader : async () => {
      if(!localStorage.getItem("access_token")){
        throw redirect("/login")
    }
    return null
    }
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="460308460975-c8ptrk4goa85kg36epe9l5k5omsrduas.apps.googleusercontent.com">
      <RouterProvider router={router} />
    </GoogleOAuthProvider>;
  </React.StrictMode>,
)
