"use client";
import React from 'react'


interface Props {
  text: string
  columun: number
  row: number
  handleToggleSeat: (column: number, row: number, isActive: boolean) => void;
}

export default function Seat({text,columun, row, handleToggleSeat}: Props) {
  const [isClicked, setIsClicked] = React.useState(false);
  const handleClicked = () => {
    setIsClicked(!isClicked)
    handleToggleSeat(columun, row, isClicked)
  }
  return (
    <button 
      className={`h-8 w-12 border rounded-lg hover:bg-gray-100 ${isClicked && 'bg-gray-200'}`}
      onClick={handleClicked}>
      {text}
    </button>
  )
}
