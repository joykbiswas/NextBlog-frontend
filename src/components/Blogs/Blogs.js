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
  const [currentPage, setCurrentPage] = useState(1);
  const [isLatest, setIsLatest] = useState(false);
  const itemsPerPage = 9;

  useEffect(() => {
    fetch("http://localhost:5000/addBlog")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
        setLoading(false);
      });
  }, []);

  const totalBlogs = blogs.length;
  const numberOfPages = Math.ceil(totalBlogs / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()];

  // Sort blogs by date if "Latest" is selected
  const filteredBlogs = isLatest
    ? [...blogs].sort((a, b) => new Date(b.date) - new Date(a.date)) // Sorting by latest date
    : blogs;

  const currentBlogs = filteredBlogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination functions
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Search submit
  const handleSearchBar = (e) => {
    e.preventDefault();
    handleSearchResults();
  };
  // Search for blog by title
  const handleSearchResults = () => {
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
      {/* Toggle between "Latest Blog" and "All Blog" */}
      <div className="flex justify-center my-5">
        <button
          className={`px-4 py-2 mr-2 rounded-md ${
            isLatest ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setIsLatest(true)} 
        >
          Latest Blog
        </button>
        <button
          className={`px-4 py-2 rounded-md ${
            !isLatest ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setIsLatest(false)}
        >
          All Blog
        </button>
      </div>

      <div>
        {loading ? (
          <div>
            <Loading></Loading>
          </div>
        ) : (
          <>
            <div className="m-5 pb-7">
              {currentBlogs.length === 0 ? (
                <EmptyList />
              ) : (
                <>
                  <BlogCard currentBlogs={currentBlogs} setBlogs={setBlogs} />
                </>
              )}
            </div>
          </>
        )}
      </div>
      {/* Pagination here */}
      <div className="text-center mb-10">
        <button
          onClick={handlePreviousPage}
          className="mr-2 py-1 px-3 rounded-md"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            className={`mr-2 py-1 px-3 rounded-md ${
              currentPage === page + 1 ? "bg-blue-200" : ""
            }`}
            onClick={() => setCurrentPage(page + 1)}
            key={page}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={handleNextPage}
          className="mr-2 py-1 px-3 rounded-md"
          disabled={currentPage === numberOfPages} 
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Blogs;
