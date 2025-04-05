// 'use client'; // We are using Next.js the homepage should be a server component

// import { useRouter } from 'next/navigation';

// export default function HomePage() {
// 
  // return (
    // 
  // );
// }
// app/page.tsx

import React from 'react';

const Home = () => {
  // const router = useRouter();

  return (
    <div style={{ fontFamily: 'Cursive, sans-serif' }}>
      {/* Main Content */}
      <div style={{
        backgroundColor: '#ADD8E6', // Light blue background
        height: 'calc(100vh - 50px)', // Adjust height to exclude the navbar
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h1 style={{ fontSize: '4rem' }}>ta.ai</h1>
      </div>
    </div>

    // <div className="p-6 max-w-sm mx-auto mt-10 bg-white rounded shadow">
    // <h2 className="text-xl font-bold mb-4 text-center">Welcome</h2>

    // <button
    //   onClick={() => router.push('/login')}
    //   className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3"
    // >
    //   Login
    // </button>

    // <button
    //   onClick={() => router.push('/signup')}
    //   className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
    // >
    //   Signup
    // </button>
    // </div>
  );
};

export default Home;