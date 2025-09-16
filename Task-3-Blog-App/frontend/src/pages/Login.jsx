import React, { useState, useContext } from "react";
import Input from "../components/Input";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(form);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <div className="text-red-600 mb-3">{error}</div>}
      <form onSubmit={handleSubmit}>
        <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" />
        <Input label="Password" name="password" value={form.password} onChange={handleChange} type="password" />
        <button className="w-full py-2 mt-2 bg-indigo-600 text-white rounded-md">Login</button>
      </form>
    </div>
  );
};

export default Login;
