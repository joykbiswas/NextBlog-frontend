"use client";
import Banner from "@/components/Banner/Banner";
import Blogs from "@/components/Blogs/Blogs";
import SearchBar from "@/components/SearchBar/SearchBar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <div>
      <Banner />
      {/* Search Bar */}

      <div className="max-w-screen-xl mx-auto">
        <Blogs></Blogs>
      </div>
    </div>
  );
}
