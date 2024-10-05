"use client";
import Banner from "@/components/Banner/Banner";
import Blogs from "@/components/Blogs/Blogs";

export default function Home() {
  return (
    <div>
      <Banner />

      <div className="max-w-screen-xl mx-auto">
        <Blogs></Blogs>
      </div>
    </div>
  );
}
