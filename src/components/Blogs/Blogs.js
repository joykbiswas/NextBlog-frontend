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
  // const [itemsPerPage, setItemsParPage] = useState(5);
  const itemsPerPage = 9;
  // const count = 50;

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

  const currentBlogs = blogs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  
  // const handleItemPerPage = (e) => {
  //   const val = parseInt(e.target.value);
  //   setItemsParPage(val);
  //   setCurrentPage(0);
  // };

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
                  
                    <BlogCard currentBlogs={currentBlogs} 
                    setBlogs= {setBlogs}
                    />
                 
                </>
              )}
            </div>

            {/* <div className="sidebar">
                <Sidebar ></Sidebar>
              </div> */}
          </>
        )}
      </div>
      <div className="text-center mb-10">
        <button
          onClick={handlePreviousPage}
          className="mr-2 py-1 px-3 rounded-md"
          disabled={currentPage === 1} // Disable button if on first page
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
          disabled={currentPage === numberOfPages} // Disable if on last page
        >
          Next
        </button>
      </div>

    </div>
  );
};

export default Blogs;
