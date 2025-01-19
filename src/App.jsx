// App.jsx
import React from 'react';
import './App.css';
import './loader.css';
import Layout from './components/Layout/Layout';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './components/Home/Home';
import Aboutus from './components/Aboutus/Aboutus';
import Chechout from './components/Chechout/Chechout';
import Productdetails from './components/Productdetails/Productdetails';

function App() {
  const routers = createBrowserRouter([
    {
      path: '', element: <Layout />, children: [
        {
          path: '/',
          element: (
            <Home />
          ),
        },
        {
          path: '/checkout',
          element: (
            <Chechout />
          ),
        },
        {
          path: '/abooutus',
          element: (
            <Aboutus />
          ),
        },
        {
          path: '/product',
          element: (
            <Productdetails />
          ),
        },
      ]
    }
  ]);

  return (
    <>
      <div>
        <RouterProvider router={routers} />
      </div>
    </>
  );
}

export default App;