"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const BookForm = ({initialBook=null, isEditing=false}) => {
  const[title,setTitle] = useState(initialBook?.title || '');
  const[author,setAuthor]= useState(initialBook?.author || '');
  const[genre,setGenre] = useState(initialBook?.genre || '');
  const[isbn,setIsbn] = useState(initialBook?.isbn || '');
  const[error,setError] = useState('');
  const[successMessage,setSuccessMessage]= useState('');
  const router = useRouter();


  const handleGoBack = () => {
    router.push('/'); // Navigate to the root path (your homepage)
  };
  const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const bookData = {title,author,genre,isbn};
        const url= isEditing ? `/api/books/${initialBook._id}` : '/api/books';
        const method=isEditing ? 'PUT' : 'POST';

        try{
          const res= await fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(bookData)});
          if(!res.ok){
             const errorData = await res.json();
             setError(errorData.message || 'Failed to save book');
             return;
          }
          
          setSuccessMessage(`Book ${isEditing ? 'updated' : 'added'} successfully!`);
          setTimeout(()=>{
             router.push('/');
          },1500);
        }catch(err){
          console.error('Form Submission error:',err);
          setError('An unexpected error occurred!'); 
        }
  }


  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      {/* <h2 className="text-2xl font-semibold mb-4">{isEditing ? 'Edit Book' : 'Add New Book'}</h2> */}
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {successMessage && <p className="text-green-500 mb-2">{successMessage}</p>}
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block text-gray-700 text-sm font-bold mb-2">
          Author:
        </label>
        <input
          type="text"
          id="author"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="genre" className="block text-gray-700 text-sm font-bold mb-2">
          Genre:
        </label>
        <input
          type="text"
          id="genre"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="isbn" className="block text-gray-700 text-sm font-bold mb-2">
          ISBN:
        </label>
        <input
          type="text"
          id="isbn"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
        />
      </div>
      <div className="flex justify-between items-center">
      <a onClick={handleGoBack} className="bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-800 font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Back to Home
          </a>
            <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isEditing ? 'Update Book' : 'Add Book'}
        </button>
      </div>
    </form>
  )
}

export default BookForm