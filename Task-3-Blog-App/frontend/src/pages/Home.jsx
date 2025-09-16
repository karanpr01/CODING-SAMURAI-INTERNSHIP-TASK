import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Welcome to Blogify</h1>
        <Link to="/blogs" className="text-indigo-600">Explore Blogs →</Link>
      </div>

      <div className="bg-white p-6 rounded-md shadow">
        <p>Start writing, sharing, and learning. Use the top nav to login or register.</p>
      </div>
    </div>
  );
};

export default Home;
