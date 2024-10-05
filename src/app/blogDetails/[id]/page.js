"use client";
import Banner from "@/components/Banner/Banner";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
const BlogDetails = ({ params }) => {
  const { id } = params;
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/addBlog")
      .then((res) => res.json())
      .then((data) => {
        const foundBlog = data.find((blog) => blog._id === id);
        setBlog(foundBlog);
      });
  }, [id]);


  if (!blog) {
    return (
      <div>
        <div className="skeleton h-32 w-32"></div>
      </div>
    );
  }

  return (
    <div>
      <Banner></Banner>

      <div className="max-w-3xl mx-auto p-4 mt-4">
        <Link href="/">
          <div className="flex items-center gap-3 mb-5  hover:text-blue-600">
            <FaArrowLeftLong />
            <h4>Return Home</h4>
          </div>
        </Link>
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
