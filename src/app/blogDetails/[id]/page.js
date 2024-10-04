"use client";
import Banner from "@/components/Banner/Banner";
import React, { useEffect, useState } from "react";

const BlogDetails = ({ params }) => {
  const { id } = params; // Extracting id from params
  const [blog, setBlog] = useState(null); // To store the filtered blog

  useEffect(() => {
    fetch("http://localhost:5000/addBlog")
      .then((res) => res.json())
      .then((data) => {
        // Filter the blog by matching the id
        const foundBlog = data.find((blog) => blog._id === id);
        setBlog(foundBlog);
      });
  }, [id]); // Dependency on id

  // Show a loader or fallback if blog is not yet fetched
  if (!blog) {
    return (
      <div>
        <h3>Loading Blog Details...</h3>
      </div>
    );
  }

  return (
    <div>
      <Banner></Banner>
      <div className="max-w-3xl mx-auto p-4 mt-7">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 text-sm mb-2">
          By: {blog.name} | {blog.date}
        </p>
        <p className="text-lg">{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
