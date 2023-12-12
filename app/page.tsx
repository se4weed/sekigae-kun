"use client";

import CSVReader from "@/components/CSVReader";
import SeatArrange from "@/components/SeatArrange";
import { useState } from "react";

export default function Home() {
  const [seatData, setSeatData] = useState<boolean[][]>([[true]]);
  const handleUploadUserCsv = (data: any): void => {
    const _formattedData = data.map((row: any) => {
      return {
        number: row[0],
        name: row[1]
      };
    }
    ).filter((row: any) => row != null);
    console.log(_formattedData);
  }
  const handleSetSeatData = (data: boolean[][]): void => {
    setSeatData(data);
    console.log(seatData);
  }
  const handleExecute = () => {
    console.log('実行ボタンが押されました');
    console.log(seatData);
  }
  return (
    <>
      <div className="flex items-center justify-center h-20 bg-gray-200">
        <div className="text-center">
          <h1 className="text-3xl font-bold">席替えくん</h1>
        </div>
      </div>
      <div className="px-20">
      <h2 className="text-2xl">対象者のデータ</h2>
        <div className="">
          <CSVReader setUploadedData={handleUploadUserCsv} />
        </div>
        <h2 className="text-2xl">配席のデータ</h2>
        <div className="flex mx-auto w-full">
          <SeatArrange handleSetSeatData={handleSetSeatData} />
        </div>
      </div>
      <div className="flex w-full">
        <p className="mx-auto">現在の席数: {seatData.map(row => row.filter(value => value).length).reduce((a, b) => a + b, 0)}席</p>
      </div>
      <div className="w-full flex mx-auto">
        <button 
          onClick={handleExecute}
          className="green-blue-btn my-5 mx-auto">
          席替えを実行
        </button>
      </div>
      
      
    </>
  )
}
