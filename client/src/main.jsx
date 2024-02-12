import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <>
      <h1>Home Page</h1>
    </>
  },
  {
    path: "/product",
    element: 
    <>
      <h1>Product List Page</h1>
    </>
  },
  {
    path: "/product/:id",
    element: 
    <>
      <h1>Product Detail Page</h1>
    </>
  },
  {
    path: "/cart",
    element: 
    <>
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
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
