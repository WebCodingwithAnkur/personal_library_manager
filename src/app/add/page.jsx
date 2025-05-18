'use client';
import { motion } from "framer-motion";
import BookForm from "../components/BookForm";

export default function AddBookPage(){
    return (
        <>
        <motion.h1
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="text-4xl font-extrabold text-gray-800 text-center relative mb-10"
>
  My Personal Library
  <span className="block w-1/3 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto mt-2 rounded-full"></span>
</motion.h1>
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
             <BookForm />
          </div>
        </>  
      );
}