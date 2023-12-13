import React from 'react'


interface Props {
  userData: {number: number; name: string}[]
}
export default function UserTable({userData}: Props) {
  if (userData.length === 0) {
    return (
      <div className='text-center my-5'>
        <p>対象者のデータがありません</p>
      </div>
    )
  }
  return (
    <table className='table-auto border my-2'>
      <thead>
        <tr>
          <th className='border px-4 py-2'>number</th>
          <th className='border px-4 py-2'>name</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((row, index) => (
          <tr key={index}>
            <td className='border px-4 py-2'>{row.number}</td>
            <td className='border px-4 py-2'>{row.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
