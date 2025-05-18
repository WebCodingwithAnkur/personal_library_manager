import Link from 'next/link';
import { BookOpen, User, Tag, Barcode,Trash2 } from 'lucide-react';
import { useState } from 'react';

function BookCard({book, onDelete }) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    onDelete(book._id);
    setIsDeleteDialogOpen(false);
  };

  const cancelDelete = () => {
    setIsDeleteDialogOpen(false);
  };
  
  return (
    <>
    <div className="w-full max-w-md mx-auto bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-lg overflow-hidden 
    transition-transform  hover:scale-[1.02] hover:shadow-2xl duration-300 min-h-[260px] flex flex-col justify-between 
    border border-gray-200">
      <div className="p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 
      bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] 
      bg-repeat bg-opacity-10 rounded-t-2xl">
        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-indigo-500" />
          {book.title}
        </h3>

        <p className="text-gray-600 flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <span>Author: <span className="font-medium text-gray-800">{book.author}</span></span>
        </p>

        <p className="text-gray-600 flex items-center gap-2 min-h-[24px]">
          <Tag className="w-4 h-4 text-gray-500" />
          <span>
            Genre: <span className="text-gray-800">{book.genre || <span className="italic text-gray-400">N/A</span>}</span>
          </span>
        </p>

        <p className="text-gray-600 flex items-center gap-2 min-h-[24px]">
          <Barcode className="w-4 h-4 text-gray-500" />
          <span>
            ISBN: <span className="text-gray-800">{book.isbn || <span className="italic text-gray-400">N/A</span>}</span>
          </span>
        </p>
      </div>

      {/* Button section with solid background */}
      <div className="p-4 bg-white flex justify-end gap-2 rounded-b-2xl">
        <Link
          href={`/edit/${book._id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-all"
        >
          Edit
        </Link>
        <button
          onClick={handleDeleteClick}
          className="bg-red-600 hover:bg-red-700 cursor-pointer text-white font-medium px-4 py-2 
          rounded-lg flex items-center gap-1 transition-all"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>
      </div>

    </div>
    
      {/* Delete Confirmation Dialog (Centered) */}
      {isDeleteDialogOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center z-50"> {/* Added z-50 */}
          <div className="bg-white rounded-md p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete "{book.title}"?</p>
            <div className="flex justify-end">
              <button
                onClick={cancelDelete}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 hover:bg-red-700  text-white font-bold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BookCard;
