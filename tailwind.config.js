// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite/**/*.js" // تأكد من أن هذا المسار صحيح بالنسبة للمكتبة
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin') // إضافة Flowbite كمكون إضافي لـ Tailwind
  ],
}
