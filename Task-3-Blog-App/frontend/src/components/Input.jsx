import React from "react";

const Input = ({ label, type="text", value, onChange, name, placeholder }) => (
  <div className="mb-4">
    {label && <label className="block text-sm font-medium mb-1">{label}</label>}
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
    />
  </div>
);

export default Input;
