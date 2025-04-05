// app/layout.tsx

import type { Metadata } from "next";
import { Inter, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans"})
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono"})

// Define the Navigation Bar as a separate component
const NavigationBar = () => (
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
      <a href="/recent" style={{ color: 'white', marginLeft: '20px', marginRight: '50px', textDecoration: 'none' }}>Recent</a>
    </div>
  </div>
);

export const metadata: Metadata = {
  title: "ta.ai - Your Teacher Assistant",
  description: "A smart assistant that helps you create study materials.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Navigation Bar */}
        <NavigationBar />
        {/* Main Content (child components) */}
        {children}
      </body>
    </html>
  );
}
