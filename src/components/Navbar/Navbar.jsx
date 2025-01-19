import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; // تأكد من أن المسار صحيح
import logo from "../../assets/Trendy Vibes 2.png";

export default function Navbar() {
    // حالة للتحكم في إظهار القائمة أو لا
    const [isOpen, setIsOpen] = useState(false);

    // دالة للتبديل بين إظهار وإخفاء القائمة
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src={logo} className="h-12" alt="Logo" />
                    </NavLink>
                    <button
                        onClick={toggleMenu} // استخدام الدالة هنا
                        data-collapse-toggle="navbar-default"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-default"
                        aria-expanded={isOpen ? "true" : "false"} // تحديث قيمة aria-expanded بناءً على الحالة
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
                        </svg>
                    </button>
                    <div className={`w-full ${isOpen ? "block" : "hidden"} md:block md:w-auto`} id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <NavLink to="/" className="block py-2 px-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Home</NavLink>
                            </li>
                            <li>
                                <NavLink to="/checkout" className="block py-2 px-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Checkout</NavLink>
                            </li>
                            {/* <li>
                                <NavLink to="/abooutus" className="block py-2 px-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500">Aboout Us</NavLink>
                            </li> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
