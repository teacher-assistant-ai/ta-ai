import React from 'react';

const Recent = () => {
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
        <h1 style={{ fontSize: '4rem' }}>[recent]</h1>
      </div>
    </div>
  );
};

export default Recent;

