"use client";
import { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import { useParams, useRouter } from 'next/navigation';
import BookForm from "@/app/components/BookForm";
import LoadingSpinner from '@/app/components/LoadingSpinner';


export default function EditBookPage(){
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const router = useRouter();
   
    useEffect(() => {
        async function fetchBook() {
          try {
            const res = await fetch(`/api/books/${id}`);
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setBook(data);
            setLoading(false);
          } catch (err) {
            setError(err.message);
            setLoading(false);
          }
        }
    
        fetchBook();
      }, [id]);
    
      if (loading) {
        return <LoadingSpinner loadingMessage="Loading book details..." />;
      }
    
      if (error) {
        return <p className="text-red-500 text-center">Error loading book: {error}</p>;
      }
    
      if (!book) {
        return <p className="text-center">Book not found.</p>;
      }


    return(
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
            <h2 className="text-2xl font-semibold mb-4">Edit Book</h2>
            <BookForm initialBook={book} isEditing={true}/>
        </div>
        </>
    )
}