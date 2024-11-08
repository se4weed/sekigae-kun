import React, { useEffect } from 'react'


interface Props {
  seatData: boolean[][];
  shuffledUserData: {number: number; name: string}[];
  setShuffledSeatData: React.Dispatch<React.SetStateAction<{number: number | null; name: string}[][]>>;
}
interface User {
  number: number | null;
  name: string;
}
function arrangeUserData(shuffledUserData: {number: number; name: string}[], seatData: boolean[][]): User[][]{
  const seatTable: User[][] = [];
  const _shuffledUserData = [...shuffledUserData];
  const _seatData = [...seatData];
  for (let i = 0; i < _seatData.length; i++) {
    let _seatTableRecord = [];
    for (let j = 0; j < _seatData[i].length; j++) {
      if (_seatData[i][j] === true) {
        _seatTableRecord.push(_shuffledUserData.pop());
      }else{
        _seatTableRecord.push({number: null, name: ''});
      }
    }
    _seatTableRecord = _seatTableRecord.filter(Boolean) as User[];
    seatTable.push(_seatTableRecord);
  }
  return seatTable;
}
export default function SeatShuffle({seatData, shuffledUserData, setShuffledSeatData}: Props) {
  const columnCount = seatData[0].length;
  const _shuffledSeatData = arrangeUserData(shuffledUserData, seatData);
  useEffect(() => {
    setShuffledSeatData(_shuffledSeatData);
  }, [seatData, shuffledUserData])
  return (
    <div className='mx-auto'>
      <table className='table-auto mx-auto my-5'>
        <thead>
          <tr className='text-center'>
            <td colSpan={columnCount+1} className='font-bold text-xl'>前方</td>
          </tr>
          <tr>
            <th className='border px-4 py-2'></th>
            {/* n列目 */}
            {Array(columnCount).fill(0).map((_, index) => (
              <th key={index} className='border px-4 py-2'>{index + 1}列目</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {_shuffledSeatData.map((seatDataRow, index_row) => (
            <tr key={index_row}>
              {/* n行目 */}
              <td className='border px-4 py-2 w-20 font-semibold'>{index_row+1}行目</td>
              {seatDataRow.map((seatDataColumn, index_column) => (
                <td className='border px-4 py-2 text-center' key={index_column}>{seatDataColumn.number}<br />{seatDataColumn.name}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
