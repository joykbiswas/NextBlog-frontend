"use client"
import Banner from "@/components/Banner/Banner";
import SearchBar from "@/components/SearchBar/SearchBar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [searchKey, setSearchKey] = useState("");


    // Search submit
    const handleSearchBar = (e) => {
      e.preventDefault();
      handleSearchResults();
    };

  return (
    <div>
      <Banner />
       {/* Search Bar */}
       <SearchBar
        value={searchKey}
        // clearSearch={handleClearSearch}
        formSubmit={handleSearchBar}
        handleSearchKey={(e) => setSearchKey(e.target.value)}
      />
      <div className="max-w-screen-xl mx-auto">
        
      </div>
    </div>
  );
}
