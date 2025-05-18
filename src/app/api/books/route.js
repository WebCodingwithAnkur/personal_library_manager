import { NextResponse } from 'next/server';
import connectMongoDB from '@/app/_utils/db';
import Book from '@/models/Book';


export async function POST(request) {
  try {
    await connectMongoDB();
     //return NextResponse.json('Post Request Called!');
     const {title,author,genre,isbn} = await request.json();
     const newBook = new Book({title,author,genre,isbn});
     const savedBook = await newBook.save();
     return NextResponse.json(savedBook,{status:201});
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ message: 'Failed to create book' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    const books = await Book.find({});
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ message: 'Failed to fetch books' }, { status: 500 });
  }
}