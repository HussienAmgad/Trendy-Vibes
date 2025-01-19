import React, { useState } from 'react'

export default function Aboutus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <input
        type="text"
        placeholder="Your Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <textarea
        placeholder="Your Message"
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
}
