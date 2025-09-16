import React, { useState, useContext } from "react";
import Input from "../components/Input";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
      // register handles navigation
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Create account</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <form onSubmit={handleSubmit}>
        <Input label="Name" name="name" value={form.name} onChange={handleChange} />
        <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
        <Input label="Password" name="password" value={form.password} onChange={handleChange} type="password" />
        <button className="w-full py-2 mt-2 bg-indigo-600 text-white rounded-md">Register</button>
      </form>
    </div>
  );
};

export default Register;
