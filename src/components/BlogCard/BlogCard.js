import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const BlogCard = ({ currentBlogs, setBlogs }) => {

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://next-blog-backend.vercel.app/addBlog/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            
            if (data.deletedCount > 0) {
              Swal.fire("Deleted!", "Your Blog has been deleted.", "success");
              setBlogs((prevBlogs) =>
                prevBlogs.filter((blog) => blog._id !== _id)
              );
            }
          });
      }
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {currentBlogs.map((blog) => (
        <div key={blog._id}>
          <>
            <div className=" border rounded-md p-4 shadow hover:shadow-lg space-y-3">
              <Link href={`blogDetails/${blog._id}`}>
                <h3 className="text-xl font-semibold">
                  {blog.title.length > 40
                    ? `${blog.title.slice(0, 33)}...`
                    : blog.title}
                </h3>
                <p>
                  {blog.description.length > 150
                    ? `${blog.description.slice(0, 150)}...`
                    : blog.description}
                </p>
                <div>
                  <p className="text-gray-500 text-sm">By: {blog.name}</p>
                  <p className="text-gray-400 text-sm">Date: {blog.date}</p>
                </div>
              </Link>
              <div className="flex justify-between ">
                <Link href={`updateBlog/${blog._id}`}>
                  <button className="px-5 py-3 rounded-md bg-slate-700 text-white hover:bg-blue-800">
                    Edit
                  </button>
                </Link>

                <button
                  onClick={() => handleDelete(blog._id)}
                  className="px-5 py-3 rounded-md bg-slate-700 text-white hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          </>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
