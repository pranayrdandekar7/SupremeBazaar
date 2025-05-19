import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './views/Home/Home';

import Signup from './views/Signup/Signup';
import Login from './views/Login/Login';
import Dashboard from './views/Dashboard/Dashboard';
import UserOrders from "./views/UserOrders/UserOrders"
import Cart from './views/Cart/Cart';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <Dashboard />
  },
  {
    path: "/user/orders",
    element: <UserOrders/>
  },
   {
    path: "/user/cart",
    element: <Cart/>
  },
  {
    path: "*",
    element: <h1> 404 Page not found </h1>
  }

])
root.render(
  <div className="bg-zinc-100 min-h-screen">
    <RouterProvider router={router} />
  </div>
)

