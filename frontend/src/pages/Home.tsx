// src/components/HomePage.tsx

import { useNavigate } from "react-router-dom";


export const HomePage = () => {
    const navigate = useNavigate()


  return (
    <div className="flex flex-col h-screen">
      <header className="p-4 flex justify-end">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={()=>{
            navigate('/signin')
        }}>
          Signin
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{
            navigate("/signup")
        }}>
          Sign Up
        </button>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to PenSpace</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          The platform to share your thoughts, ideas, and stories with the world.
        </p>
        <p className="text-xl font-semibold text-blue-700 mb-4">Start Writing Today!</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{
            navigate("/signup")
        }}>
          Get Started
        </button>
      </main>
      <footer className="p-4 text-center text-gray-500">
        Made with love by Naman Kundra
      </footer>
    </div>
  );
};

export default HomePage;
