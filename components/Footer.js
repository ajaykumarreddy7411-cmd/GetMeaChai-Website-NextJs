import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 px-4 shadow-inner">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
        
        {/* Left Section */}
        <p className="text-sm md:text-base opacity-80">
          © {new Date().getFullYear()} <span className="font-semibold">GetMeAChai!</span>. All rights reserved.
        </p>
        
        {/* Right Section */}
        <p className="text-sm md:text-base font-medium bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Fund your projects with chai ☕
        </p>
      </div>
    </footer>
  )
}

export default Footer
