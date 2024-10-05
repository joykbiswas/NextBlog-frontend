import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <>
      <div>
        <header className="flex flex-col items-center text-center h-72 relative">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('https://i.ibb.co/yWVWFrS/inner-bg-2.jpg')",
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />

          {/* Content */}
          <div className="relative mt-10 z-10">
            <h2 className="text-3xl text-blue-500 font-bold">
              Next Blog. This Morning
            </h2>
            <h1 className="text-3xl text-blue-500 font-bold mb-4">
              <span className="text-white ">“</span> Blog
              <span className="text-white">”</span>
            </h1>
            <p className="text-2xl text-white font-semibold pb-4 hidden sm:block">
              awesome place to make oneself <br /> productive and entertained
              through daily updates.
            </p>
            <Link href="/createBlog">
              <button className="relative border-none bg-blue-800 text-white text-lg font-bold py-4 px-8 rounded transition-all duration-500 hover:bg-blue-700">
                <span className="inline-block pr-2 transition-transform duration-500">
                  Create New Blog
                </span>
                <span className="absolute opacity-0 right-[-20px] transition-opacity duration-500">
                  &#x00bb;
                </span>
              </button>
            </Link>
          </div>
        </header>
      </div>
    </>
  );
};

export default Banner;
