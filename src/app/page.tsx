'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="p-6 max-w-sm mx-auto mt-10 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Welcome</h2>

      <button
        onClick={() => router.push('/login')}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3"
      >
        Login
      </button>

      <button
        onClick={() => router.push('/signup')}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        Signup
      </button>
    </div>
  );
}