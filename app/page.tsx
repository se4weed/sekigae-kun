import React from 'react'
import { Sekigae } from './Home'

const Home = () => {
  return (
    <>
    <div className="flex items-center justify-center h-20 bg-gray-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold">席替えくん</h1>
      </div>
    </div>
    <Sekigae />
    </>
  )
}

export default Home
