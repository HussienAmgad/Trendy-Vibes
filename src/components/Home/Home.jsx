import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://trendy-vibes-server.vercel.app/products?category=all', {
          method: 'POST', // Use GET if the server expects it for fetching data
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const view = (id) => {
    navigate('/product', { state: id });
  };

  if (loading) {
    return <div className="loader"></div>;
  }

  return (
    <>
      <ToastContainer /> {/* مكون التوست */}
      <div className="min-h-screen bg-gray-100 p-8" >
        <h1 className="text-4xl font-extrabold text-center text-green-600 mb-8">Our Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
            onClick={() => view(product._id)}
              key={product._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                className="w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
                <p className="text-sm text-gray-600 truncate">{product.description}</p>
                <div className="mt-4">
                  <p className="text-gray-800 font-semibold">
                    Price Before: <span className="line-through">{product.priceBefore} EGP</span>
                  </p>
                  <p className="text-green-600 font-bold">Price After: {product.priceAfter} EGP</p>
                </div>
                <div className="mt-4 flex justify-between gap-2">
                  <button
                    className="w-full bg-blue-500 text-white py-2 font-semibold hover:bg-blue-600 rounded"
                    onClick={() => view(product._id)}
                  >
                    Open
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
