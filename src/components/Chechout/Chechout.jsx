import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // تأكد من استيراد toaster

export default function Checkout() {
    const navigate = useNavigate(); // تعريف useNavigate
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchCartItems = async () => {
            const items = JSON.parse(localStorage.getItem("info")) || [];
            const updatedCartItems = await Promise.all(
                items.map(async (item) => {
                    const { id, size, color } = item;
                    try {
                        const response = await axios.get(`https://trendy-vibes-server.vercel.app/products/${id}`);
                        const productData = response.data;
                        return { ...productData, size, color };
                    } catch (error) {
                        console.error("Error fetching product data:", error);
                        return null;
                    }
                })
            );
            setCartItems(updatedCartItems.filter((item) => item !== null));
            setLoading(false);
        };

        fetchCartItems();
    }, []);

    const handleRemoveItem = (id) => {
        // تصفية العناصر المحذوفة بناءً على id فريد لكل منتج
        const updatedCartItems = cartItems.filter(item => item._id !== id); // استخدم _id بدلاً من id لضمان التفرد
        setCartItems(updatedCartItems);
        localStorage.setItem("info", JSON.stringify(updatedCartItems)); // تحديث ال localStorage
        toast.info("Product removed from the cart.");
    };

    const handleClearCart = () => {
        setCartItems([]);
        localStorage.removeItem("info"); // حذف كل العناصر من localStorage
        toast.info("All products removed from the cart.");
    };

    const formik = useFormik({
        initialValues: {
            customerPhone: "",
            additionalPhone: "",
            customerName: "",
            governorate: "",
            address: "",
            notes: "",
        },
        validationSchema: Yup.object({
            customerPhone: Yup.string()
                .required("Phone number is required")
                .matches(/^[0-9]{11}$/, "Must be a valid 11-digit phone number"),
            customerName: Yup.string().required("Full name is required"),
            governorate: Yup.string().required("Governorate is required"),
            address: Yup.string().required("Address is required"),
            additionalPhone: Yup.string().matches(
                /^[0-9]{11}$/,
                "Must be a valid 11-digit phone number"
            ),
        }),
        onSubmit: async (values) => {
            setSubmitting(true);
            const orderData = {
                ...values,
                products: cartItems,
            };
            console.log("Data being sent to the backend:", orderData);

            try {
                const response = await axios.post("https://trendy-vibes-server.vercel.app/orders", orderData);
                console.log("Response from backend:", response.data);
                localStorage.removeItem("info")
                localStorage.removeItem("countofadding")
                setTimeout(() => {
                    navigate("/"); // الانتقال إلى الصفحة الرئيسية بعد تسجيل الدخول بنجاح
                }, 2000);
                toast.success("Order submitted successfully!"); // Toast success
            } catch (error) {
                console.error("Error submitting order:", error);
                toast.error("Failed to submit order. Please try again."); // Toast error
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Checkout</h1>
            <form
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                onSubmit={formik.handleSubmit}
            >
                <input
                    type="text"
                    placeholder="Phone Number"
                    className={`p-2 border rounded ${
                        formik.errors.customerPhone && formik.touched.customerPhone
                            ? "border-red-500"
                            : "border-gray-300"
                    }`}
                    {...formik.getFieldProps("customerPhone")}
                />
                {formik.touched.customerPhone && formik.errors.customerPhone ? (
                    <div className="text-red-500 text-sm">{formik.errors.customerPhone}</div>
                ) : null}
                <input
                    type="text"
                    placeholder="Additional Phone Number"
                    className="p-2 border border-gray-300 rounded"
                    {...formik.getFieldProps("additionalPhone")}
                />
                {formik.touched.additionalPhone && formik.errors.additionalPhone ? (
                    <div className="text-red-500 text-sm">{formik.errors.additionalPhone}</div>
                ) : null}
                <input
                    type="text"
                    placeholder="Full Name"
                    className={`p-2 border rounded ${
                        formik.errors.customerName && formik.touched.customerName
                            ? "border-red-500"
                            : "border-gray-300"
                    }`}
                    {...formik.getFieldProps("customerName")}
                />
                {formik.touched.customerName && formik.errors.customerName ? (
                    <div className="text-red-500 text-sm">{formik.errors.customerName}</div>
                ) : null}
                <input
                    type="text"
                    placeholder="Governorate"
                    className={`p-2 border rounded ${
                        formik.errors.governorate && formik.touched.governorate
                            ? "border-red-500"
                            : "border-gray-300"
                    }`}
                    {...formik.getFieldProps("governorate")}
                />
                {formik.touched.governorate && formik.errors.governorate ? (
                    <div className="text-red-500 text-sm">{formik.errors.governorate}</div>
                ) : null}
                <input
                    type="text"
                    placeholder="Address"
                    className={`p-2 border rounded ${
                        formik.errors.address && formik.touched.address
                            ? "border-red-500"
                            : "border-gray-300"
                    }`}
                    {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address ? (
                    <div className="text-red-500 text-sm">{formik.errors.address}</div>
                ) : null}
                <textarea
                    placeholder="Notes"
                    className="p-2 border border-gray-300 rounded md:col-span-2"
                    {...formik.getFieldProps("notes")}
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded md:col-span-2 hover:bg-blue-600 disabled:opacity-50"
                    disabled={submitting}
                >
                    {submitting ? "Submitting..." : "Submit"}
                </button>
            </form>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-4">Your Cart</h2>
                {loading ? (
                    <p>Loading your cart...</p>
                ) : cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item, index) => (
                            <div
                                key={item._id} // تأكد من استخدام _id كـ key فريد
                                className="flex items-center justify-between bg-white p-4 rounded shadow"
                            >
                                <img
                                    src={item.imageUrls[0]}
                                    alt={item.name}
                                    className="w-16 h-16 rounded object-cover"
                                />
                                <div className="flex-1 ml-4">
                                    <h3 className="text-lg font-semibold">{item.name}</h3>
                                    <p className="text-gray-500">Size: {item.size}</p>
                                    <p className="text-gray-500">Color: {item.color}</p>
                                </div>
                                <p className="text-blue-500 font-semibold">{item.priceAfter} EGP</p>
                                <button
                                    onClick={() => handleRemoveItem(item._id)} // تأكد من أن id هو _id
                                    className="text-red-500 font-semibold hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* إضافة زر مسح جميع العناصر */}
            <div className="mt-4 text-center">
                <button
                    onClick={handleClearCart}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                    Clear All Items
                </button>
            </div>
        </div>
    );
}
