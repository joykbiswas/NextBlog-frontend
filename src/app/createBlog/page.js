"use client";
import React from "react";
import Swal from "sweetalert2";

const CreateBlog = () => {
  const handleSubmitted = (e) => {
    e.preventDefault();

    const form = e.target;
    const title = form.title.value;
    const description = form.description.value;
    const name = form.name.value;
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const addBlog = { title, description, name , date};
    console.log(addBlog);
    fetch('http://localhost:5000/addBlog',{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body:JSON.stringify(addBlog)

    })
    .then(res =>res.json())
    .then(data =>{
        console.log(data);
        if(data.insertedId){
           
            Swal.fire({
                title: 'success!',
                text: 'Blog added successfully',
                icon: 'success',
                confirmButtonText: 'Add'
              })
        }
        form.reset();
    })
  };
  return (
    <div>
      <div class="container mx-auto max-w-md p-5 mt-7 ">
        <h2 class="text-2xl font-bold text-center mb-4">Create New Blog</h2>
        <form
          onSubmit={handleSubmitted}
          method="POST"
          class="space-y-4 shadow-md p-4"
        >
          <div className="relative mx-auto w-full">
            <input
              className="peer w-full border border-crimson rounded-md  bg-transparent px-4 py-3 focus:border-blue-300 focus:outline-none"
              type="text"
              name="name"
              placeholder=""
              required
            />
            <label className="absolute -top-2 left-2 rounded-md bg-blue-500 px-2 text-base text-sky-100 duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-600 peer-focus:-top-2 peer-focus:bg-blue-500 peer-focus:text-sm peer-focus:text-white">
              Name
            </label>
          </div>
          <br />
          <div className="relative mx-auto w-full">
            <input
              className="peer w-full border border-crimson rounded-md  bg-transparent px-4 py-3 focus:border-blue-300  focus:outline-none"
              type="text"
              name="title"
              placeholder=""
              required
            />
            <label className="absolute -top-2 left-2 rounded-md bg-blue-500 px-2 text-base text-sky-100 duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-sm peer-placeholder-shown:text-zinc-600 peer-focus:-top-2 peer-focus:bg-blue-500 peer-focus:text-sm peer-focus:text-white">
              Title
            </label>
          </div>
          <br />

          <div className="space-y-2 text-sm text-zinc-700 dark:text-zinc-400">
            <label className="block font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              className="min-h-[80px] w-full rounded border px-3 py-2 leading-tight focus:outline-none focus:ring-1 "
              id="description"
              placeholder="Enter Your Blog Description"
              name="description"
            />
          </div>

          <div class="mt-5 flex justify-center">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md mx-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
