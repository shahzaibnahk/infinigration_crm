import React from 'react'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <div className='w-full h-screen bg-red-500 flex items-center justify-center'>
      <Link className='text-white' to={"/"}>Back To Home</Link>
    </div>
  )
}

export default Error404
