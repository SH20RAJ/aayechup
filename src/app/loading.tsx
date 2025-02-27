import React from 'react'

function loading() {
  return (
    <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        <img 
          src="/logo.png"
          alt="Logo"
          className="w-32 h-32 animate-pulse"
        />
        <div className="text-xl font-semibold text-gray-600">
          Loading...
        </div>
      </div>
    </div>
  )
}

export default loading
