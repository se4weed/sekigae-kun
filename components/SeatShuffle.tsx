import React from 'react'


interface Props {
  seatData: {number: number; name: string}[][]
  shuffledUserData: {number: number; name: string}[]
}

function arrangeUserData(shuffledUserData: {number: number; name: string}[], seatData: {number: number; name: string}[][]): {number: number; name: string}[][] {
  const _shuffledSeatData = [...seatData];
  let index = 0;
  for (let i = 0; i < _shuffledSeatData.length; i++) {
    for (let j = 0; j < _shuffledSeatData[i].length; j++) {
      if (_shuffledSeatData[i][j]) {
        _shuffledSeatData[i][j] = shuffledUserData[index];
        index++;
      }
    }
  }
  return _shuffledSeatData;
}
export default function SeatShuffle({seatData, shuffledUserData}: Props) {
  const columnCount = seatData[0].length;
  const _shuffledSeatData = arrangeUserData(shuffledUserData, seatData);
  console.log(_shuffledSeatData);
  return (
    <div>
      <table>
        <thead>
          <tr>
            {/* n列目 */}
            {Array(columnCount).fill(0).map((_, index) => (
              <th key={index} className='border px-4 py-2'>{index + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {seatData.map((seatDataRow, index_row) => (
            <tr key={index_row}>
              {/* n行目 */}
              <td className='border px-4 py-2'>{index_row+1}</td>
              {seatDataRow.map((seatDataColumn, index_column) => (
                <td className='border px-4 py-2' key={index_column}>{seatDataColumn.name}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
