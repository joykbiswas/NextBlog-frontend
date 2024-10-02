"use client";
import React, { useEffect, useState } from "react";
import BlogCard from "../BlogCard/BlogCard";
import SearchBar from "../SearchBar/SearchBar";
import EmptyList from "../EmptyList/EmptyList";
import Loading from "@/app/loading";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/addBlog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  }, []);

  console.log(blogs);

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };
  // Search for blog by title
  const handleSearchResults = () => {
    // const allBlogs = blogs;
    const filteredBlogs = blogs.filter((blog) =>
      blog.title.toLowerCase().includes(searchKey.toLowerCase().trim())
    );
    setBlogs(filteredBlogs);
  };

  // Clear search and show all blogs
  const handleClearSearch = () => {
    // setBlogs(blogs);
    setSearchKey("");
    fetch("http://localhost:5000/addBlog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  };

  return (
    <div>
      <div>
        <SearchBar
          value={searchKey}
          clearSearch={handleClearSearch}
          formSubmit={handleSearchBar}
          handleSearchKey={(e) => setSearchKey(e.target.value)}
        />
      </div>
      <div>
        {loading ? (
          <div>
            <Loading></Loading>
          </div>
        ) : (
          <>
            <div className="m-5 pb-7">
              {blogs.length === 0 ? (
                <EmptyList />
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map((blog) => (
                      <div
                        key={blog._id}
                        className="border rounded-md p-4 shadow hover:shadow-lg space-y-3"
                      >
                        <h3 className="text-xl font-semibold">
                          {blog.title.length > 40
                            ? `${blog.title.slice(0, 50)}...`
                            : blog.title}
                        </h3>
                        <p>
                          {blog.description.length > 150
                            ? `${blog.description.slice(0, 150)}...`
                            : blog.description}
                        </p>
                        <div>
                          <p className="text-gray-500 text-sm">
                            By: {blog.name}
                          </p>
                          <p className="text-gray-400 text-sm">
                            Date: {blog.date}
                          </p>
                        </div>
                        <div className="flex justify-between ">
                          <button className="px-5 py-3 rounded-md bg-slate-700 text-white hover:bg-blue-800">Edit</button>
                          <button className="px-5 py-3 rounded-md bg-slate-700 text-white hover:bg-red-700">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* <div className="sidebar">
                <Sidebar ></Sidebar>
              </div> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Blogs;
