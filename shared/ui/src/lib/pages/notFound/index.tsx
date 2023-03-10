import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="w-fit h-fit flex flex-col items-center gap-2 mx-auto my-28">
      <div className="text-3xl font-bold">404</div>
      <div className="text-xl font-medium">Page Not Found!</div>
      <Link
        to="/landing"
        className="w-fit h-fit bg-blue-500 hover:bg-blue-600 rounded-md px-3 py-1 font-semibold tracking-wider text-white"
      >
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound