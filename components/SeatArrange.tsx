"use client";
import React, { useEffect, useRef, useState } from 'react'
import Seat from '@/components/Seat'

interface Props {
  handleSetSeatData: (data: boolean[][]) => void;
  seatData: boolean[][];
}

export default function SeatArrange({handleSetSeatData, seatData}: Props) {
  const [maxRow, setMaxRow] = useState(1);
  const [maxColumn, setMaxColumn] = useState(1);
  const [seatUses, setSeatUses] = useState<boolean[][]>([[true]]); // [{row: 1, column: 1, name: 'hoge'}
  const isMounted = useRef(false);

  

  const handleAddColumn = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMaxColumn(maxColumn + 1)
    // 座席列を追加
    const _seatUses = seatUses.map(row => (row ? [...row, true] : [true]));
    setSeatUses(_seatUses)
    handleSetSeatData(_seatUses)
  }
  const handleSubColumn = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (maxColumn > 1) {
      setMaxColumn(maxColumn - 1)
      // 座席列を削除
      const _seatUses = seatUses
      _seatUses.forEach((row) => {
        row.pop()
      })
      setSeatUses(_seatUses)
      handleSetSeatData(_seatUses)
    }
  }
  const handleAddRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMaxRow(maxRow + 1)
    // 座席行を追加
    const _seatUses = [...seatUses]
    _seatUses.push(Array(maxColumn).fill(true))
    setSeatUses(_seatUses)
    // setSeatUses([...seatUses, Array(maxColumn).fill(true)])
    handleSetSeatData(_seatUses)
    console.log("seatdata:", seatData,"\nseatuses:", seatUses, "\n_seatuses",_seatUses)
  }
  const handleSubRow = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (maxRow > 1) {
      setMaxRow(maxRow - 1)
      // 座席行を削除
      const _seatUses = [...seatUses]
      _seatUses.pop()
      setSeatUses(_seatUses)
      handleSetSeatData(_seatUses)
      console.log("seatdata:", seatData,"\nseatuses:", seatUses, "\n_seatuses",_seatUses)
    }
  }
  const handleToggleSeat = (column: number, row: number, isActive: boolean) => {
    const _seatUses = [...seatUses]
    if (!_seatUses[row]) {
      _seatUses[row] = Array(maxColumn).fill(true)
    }
    _seatUses[column][row] = isActive
    setSeatUses(_seatUses)
    handleSetSeatData(_seatUses)
  }

  useEffect(() => {
    if (!isMounted.current) {
      handleSetSeatData(seatUses)
      isMounted.current = true;
      return;
    }
  }, [seatUses, seatData, handleSetSeatData])
  return (
    <table className="table-auto mx-auto">
      <tbody>
        {seatData.map((seatDataRow, index_column) => (
          <tr key={index_column}>
            {seatDataRow.map((_, index_row) => (
              <td className="px-2 py-1" key={index_row}>
                <Seat 
                  text={``}
                  handleToggleSeat={handleToggleSeat}
                  columun={index_column} 
                  row={index_row}
                />
              </td>
            ))}
            {(index_column === 0) && 
            <>
              <td className='my-auto'>
                <button 
                  type="button"
                  className="blue-btn py-1"
                  id={`${index_column}`}
                  onClick={handleAddColumn}>
                  +
                </button>
              </td>
              {(maxColumn > 1) && <td className='my-auto'>
                <button 
                  type="button"
                  className="red-btn py-1"
                  onClick={handleSubColumn}>
                  -
                </button>
              </td>}
            </>
            }
            
          </tr>
        ))}
        <tr>
        <td className='my-auto'>
          <button 
            type="button"
            className="blue-btn py-1"
            onClick={handleAddRow}>
            +
          </button>
        </td>
        {(seatData.length > 1) && <td className='my-auto'>
          <button 
            type="button"
            className="red-btn py-1"
            onClick={handleSubRow}>
            -
          </button>
        </td>}
        </tr>
      </tbody>
    </table>
  )
}
