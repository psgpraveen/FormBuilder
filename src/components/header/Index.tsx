import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
  return (
    <div className="bg-white min-h-screen">
      <header className="text-gray-600 body-font bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Link
            to="/"
            className="flex title-font font-medium items-center text-black mb-4 md:mb-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-10 h-10 p-2 bg-white-700 text-indigo-500 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="ml-3 text-xl m-4 font-bold">Form-Builder</span>
          </Link>
          <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-300 flex flex-wrap items-center text-base justify-center">
            <Link
              to="/lob"
              className="mr-5 text-black hover:text-gray-100 transition-colors duration-300"
            >
              Dashboard
            </Link>
          </nav>
          <a
            href="/"
            className="inline-flex items-center bg-white text-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-gray-100 rounded-lg shadow-md text-base font-medium transition-transform duration-300 hover:-translate-y-1"
          >
            LogOut
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </header>
    </div>
  )
}

export default Index
