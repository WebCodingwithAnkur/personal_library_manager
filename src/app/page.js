'use client';
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BookCard from "./components/BookCard";
import { PlusIcon } from '@heroicons/react/24/solid';
import {useRouter } from "next/navigation";
import LoadingSpinner from "./components/LoadingSpinner";
import Image from "next/image";


export default function Home() {
  const[books,setBooks] = useState([]);
  const[loading,setLoading] = useState(true);
  const[error,setError] = useState(null);
  const router = useRouter();


  useEffect(() => {
    async function fetchBooks() {
      try {
        const res = await fetch('/api/books');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setBooks(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  const handleDeleteBook = async (id) => {
    try {
      const res = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error('Error deleting book:', errorData);
        // Optionally set an error state to show a message to the user
        return;
      }

      // Update the local state to remove the deleted book
      setBooks(books.filter((book) => book._id !== id));
      // Optionally show a success message to the user
    } catch (error) {
      console.error('Error deleting book:', error);
      // Optionally set an error state to show a message to the user
    }
  };

  if (loading) {
    return <LoadingSpinner  loadingMessage="Loading Books"/>;  
  }

  if (error) {
    return <p className="text-red-500 text-center">Error loading books: {error}</p>;
  }

   const addBook = () => {
    router.push('/add');
   }



  return (
    <div>
      <motion.h1
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  className="text-4xl font-extrabold text-gray-800 text-center relative mb-10"
>

<div className="flex items-center justify-center gap-4">
    <Image src="/logo.png" alt="Library Logo" width={75} height={75} />
    <span>My Personal Library</span>
  </div>

{/* <Image  src="/logo.png" alt="Library Logo" width={100} height={100} />
  My Personal Library */}
  <span className="block w-1/3 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto mt-2 rounded-full"></span>
</motion.h1>
    <div className="mb-4">
      <button onClick={addBook}  className="bg-green-500 hover:bg-green-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
      <PlusIcon className="h-5 w-5 mr-2" /> 
      Add New Book
    </button>
    </div>
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">      
      {books.map((book) => (
        <BookCard key={book._id} book={book} onDelete={handleDeleteBook} />
      ))}
    </div>
  </div>
  );
}
