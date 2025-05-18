import { NextResponse } from 'next/server';
import connectMongoDB from '@/app/_utils/db';
import Book from '@/models/Book';


export async function GET(request, { params }) {
  const { id } = await params;
  try {
    await connectMongoDB
    const book = await Book.findById(id);
    if (!book) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(book, { status: 200 });
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json({ message: 'Failed to fetch book' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    await connectMongoDB();
    const { title, author, genre, isbn } = await request.json();
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { title, author, genre, isbn },
      { new: true }
    );
    if (!updatedBook) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json(updatedBook, { status: 200 });
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json({ message: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await connectMongoDB();
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return NextResponse.json({ message: 'Book not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Book deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json({ message: 'Failed to delete book' }, { status: 500 });
  }
}