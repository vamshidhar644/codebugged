import React, { useState } from 'react';
import Authentication from '../context/authentication';

const Signup = () => {
  const [username, setUsername] = useState();
  const [faceImg, setFaceImg] = useState();

  const { signup } = Authentication();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup({ username, faceImg });
  };

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h1 className="text-2xl mb-6">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          className="mt-1 block w-full py-2 pl-3 pr-6 text-base leading-6 border rounded-lg shadow-md focus:leading-6"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label
          htmlFor="image"
          className="mt-4 block text-sm font-medium text-gray-700"
        >
          Image
        </label>
        <input
          type="text"
          name="image"
          id="image"
          autoComplete="image"
          className="mt-1 block w-full py-2 pl-3 pr-6 text-base leading-6 border rounded-lg shadow-md focus:leading-6"
          onChange={(e) => setFaceImg(e.target.value)}
        />

        <button
          type="submit"
          className="inline-flex justify-center py-2 px-8 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-950"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
