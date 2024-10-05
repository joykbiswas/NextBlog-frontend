"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import { useRouter } from "next/router"; // For redirecting after update

const UpdateBlog = ({ params }) => {
  const router = useRouter();
  // State to store blog data
  const [blog, setBlog] = useState({
    name: "",
    title: "",
    description: "",
  });

  // State to handle loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the blog details by params.id
  useEffect(() => {
    if (params.id) {
      fetch(`https://next-blog-backend.vercel.app/addBlog/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setBlog(data); // Set blog data
          setLoading(false); // Data fetched, loading stops
        })
        .catch((err) => {
          console.error("Error fetching blog:", err);
          setError("Failed to load blog data.");
          setLoading(false);
        });
    }
  }, [params.id]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({ ...blog, [name]: value });
  };

  // Handle form submission
  const handleUpdate = (event) => {
    event.preventDefault();

    // Prepare updated blog data
    const updatedBlog = { ...blog };

    // Send updated data to the server
    fetch(`https://next-blog-backend.vercel.app/addBlog/${params.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBlog),
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
            title: "Success!",
            text: "Blog updated successfully",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() =>{
            router.push('/')
          })
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
        // Show error message in case of server or network error
        Swal.fire({
          title: "Error!",
          text: "An error occurred while updating the blog.",
          icon: "error",
          confirmButtonText: "Retry",
        });
      });
  };

  return (
    <div className="container mx-auto max-w-md p-5 mt-7">
      <h2 className="text-2xl font-bold text-center mb-4">Update Blog</h2>
      <form onSubmit={handleUpdate} className="space-y-4 shadow-md p-4">
        <div className="relative mx-auto w-full">
          <input
            className="peer w-full border rounded-md px-4 py-3 focus:outline-none"
            type="text"
            name="name"
            value={blog.name} // Set the value from state
            onChange={handleChange} // Handle input change
            required
          />
          <label className="absolute -top-2 left-2 bg-white px-1 text-sm">Name</label>
        </div>
        <br />
        <div className="relative mx-auto w-full">
          <input
            className="peer w-full border rounded-md px-4 py-3 focus:outline-none"
            type="text"
            name="title"
            value={blog.title} // Set the value from state
            onChange={handleChange} // Handle input change
            required
          />
          <label className="absolute -top-2 left-2 bg-white px-1 text-sm">Title</label>
        </div>
        <br />
        <div className="space-y-2">
          <label htmlFor="description" className="block font-medium">
            Description
          </label>
          <textarea
            className="w-full border rounded-md px-4 py-3 focus:outline-none"
            id="description"
            name="description"
            value={blog.description} // Set the value from state
            onChange={handleChange} // Handle input change
            rows="5"
            required
          />
        </div>
        <div className="mt-5 flex justify-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateBlog;
