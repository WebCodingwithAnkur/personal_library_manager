import './globals.css';
import { Inter } from 'next/font/google';


const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Personal Library Manager',
  description: 'A simple CRUD app to manage your personal library',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} >
        <div className="container mx-auto p-4 min-h-screen bg-gradient-to-br from-white via-indigo-50 to-indigo-100">
          {/* <h1 className="text-3xl font-bold mb-6 text-center">My Personal Library</h1> */}
          {/* <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-500 to-pink-500 text-center mb-10">
  My Personal Library
  <span className="block w-1/3 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto mt-2 rounded-full"></span>
</h1> */}

          {children}
        </div>
      </body>
    </html>
  );
}