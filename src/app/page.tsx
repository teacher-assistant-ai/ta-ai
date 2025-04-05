// app/page.tsx

import React from 'react';

const Home = () => {
  return (
    <div style={{ fontFamily: 'Cursive, sans-serif' }}>
      {/* Navigation Bar */}
      <div style={{
        backgroundColor: '#2c3e50',
        color: 'white',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '1.5rem' }}>ta.ai</div>
        <div>
          <a href="/" style={{ color: 'white', marginLeft: '20px', marginRight: '50px', textDecoration: 'none' }}>Home</a>
          <a href="/upload" style={{ color: 'white', marginLeft: '20px', marginRight: '50px', textDecoration: 'none' }}>Upload</a>
          <a href="/saved" style={{ color: 'white', marginLeft: '20px',marginRight: '50px', textDecoration: 'none' }}>Recent</a>
        </div>
      </div>

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
  );
};

export default Home;

