import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';



export default function Productdetails() {
    const location = useLocation();
    const id = location.state;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [department, setDepartment] = useState('');
    const [colors, setColors] = useState([{ color: '', hexCode: '', sizes: [] }]);
    const [imageUrls, setImageUrls] = useState(['']);
    const [priceBefore, setPriceBefore] = useState('');
    const [priceAfter, setPriceAfter] = useState('');
    const [productUrl, setProductUrl] = useState('');
    const [selectedColorIndex, setSelectedColorIndex] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [addcart, setAddcart] = useState([null]);
    const [addfavorite, setAddfavorite] = useState([null]);

    useEffect(() => {
        if (id) {
            axios.get(`https://trendy-vibes-server.vercel.app/products/${id}`)
                .then((response) => {
                    const data = response.data;
                    setName(data.name);
                    setDescription(data.description);
                    setPriceBefore(data.priceBefore);
                    setPriceAfter(data.priceAfter);
                    setDepartment(data.department);
                    setImageUrls(data.imageUrls || ['']);
                    setColors(data.colors || [{ color: '', hexCode: '', sizes: [] }]);
                    setProductUrl(data.productUrl || '');
                })
                .catch((error) => console.error('Error fetching product data:', error));
        }
    }, [id]);

    const handleColorClick = (index) => {
        setSelectedColorIndex(index === selectedColorIndex ? null : index);
        setSelectedSize(''); // Reset size when color is changed
    };

    const handleSizeClick = (size) => {
        setSelectedSize(size);
    };

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        customPaging: function (i) {
            return (
                <div className="w-16 h-16">
                    <img
                        src={imageUrls[i]}
                        alt={`Thumbnail ${i + 1}`}
                        className="w-full h-full object-cover pt-5"
                    />
                </div>
            );
        }
    };

    function addtocart(details) {
        const existingProducts = JSON.parse(localStorage.getItem("info")) || [];
        existingProducts.push(details);
        localStorage.setItem("info", JSON.stringify(existingProducts));
        const currentCount = parseInt(localStorage.getItem("countofadding")) || 0;
        localStorage.setItem("countofadding", currentCount + 1);
        toast.success('Product added to cart!'); // toaster عند إضافة المنتج للسلة

    }

    function addtofavorite(details) {
        const existingProducts = JSON.parse(localStorage.getItem("infofavor")) || [];
        const isProductAlreadyInFavorites = existingProducts.some(product => product.id === details.id);

        if (isProductAlreadyInFavorites) {
            toast.info('This product is already in your favorites.'); // toaster عند تكرار المنتج
        } else {
            existingProducts.push(details);
            localStorage.setItem("infofavor", JSON.stringify(existingProducts));
            const currentCount2 = parseInt(localStorage.getItem("countoffave")) || 0;
            localStorage.setItem("countoffave", currentCount2 + 1);
            toast.success('Product added to favorites!'); // toaster عند إضافة المنتج للمفضلة
        }
    }

    return (
        <>
            <ToastContainer />

            <div className="p-8 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
                <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="w-full h-96">
                        <Slider {...sliderSettings}>
                            {imageUrls.length > 0 ? (
                                imageUrls.map((url, index) => (
                                    <img key={index} src={url} alt={`Product Image ${index + 1}`} className="h-96 w-full object-contain" />
                                ))
                            ) : (
                                <div className="w-full h-96 flex justify-center items-center text-gray-500">No images available</div>
                            )}
                        </Slider>
                    </div>
                    <div className='h-20'></div>
                    <div className="p-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{name}</h2>
                        <p className="text-gray-600 text-sm mb-2">Department: {department}</p>
                        <p className="text-gray-600 mb-6">{description}</p>
                        <div className="flex items-center mb-6">
                            <span className="text-xl text-gray-400 line-through mr-4">{priceBefore} EGP</span>
                            <span className="text-2xl text-green-600 font-semibold">{priceAfter} EGP</span>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-bold text-gray-800 mb-2">Available Colors:</h3>
                            <div className="flex gap-4">
                                {colors.map((color, index) => (
                                    <div key={index} className="flex flex-col items-center gap-2">
                                        <div
                                            className={`w-8 h-8 rounded-full border-2 cursor-pointer ${selectedColorIndex === index ? 'border-blue-500' : 'border-gray-300'}`}
                                            style={{ backgroundColor: color.hexCode }}
                                            onClick={() => handleColorClick(index)}
                                        ></div>
                                        <span className="text-sm text-gray-700">{color.color}</span>
                                        {selectedColorIndex === index && (
                                            <div className="flex gap-2 mt-2">
                                                {color.sizes.map((size, sizeIndex) => (
                                                    <span
                                                        key={sizeIndex}
                                                        className={`px-2 py-1 text-sm text-gray-700 bg-gray-200 rounded-lg cursor-pointer ${selectedSize === size ? 'bg-blue-300' : 'bg-white'} ${selectedSize === size ? 'border-2 border-blue-500' : ''}`}
                                                        onClick={() => handleSizeClick(size)}
                                                    >
                                                        {size}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                                onClick={() => {
                                    if (selectedColorIndex !== null && selectedSize) {
                                        setAddcart({ id, color: colors[selectedColorIndex].color, size: selectedSize, imageUrls });
                                        addtocart({ id, color: colors[selectedColorIndex].color, size: selectedSize, imageUrls });
                                    } else {
                                        toast.error('Please select a color and size'); // toaster عند عدم اختيار اللون والحجم
                                    }
                                }}
                            >
                                Add to Cart
                            </button>
                            <button
                                className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg"
                                onClick={() => {
                                    setAddfavorite({ id });
                                    addtofavorite({ id });
                                }}
                            >
                                Add to Wishlist
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
