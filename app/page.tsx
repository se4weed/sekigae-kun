"use client";

import CSVDownloader from "@/components/CSVDownloader";
import CSVReader from "@/components/CSVReader";
import SeatArrange from "@/components/SeatArrange";
import SeatShuffle from "@/components/SeatShuffle";
import UserTable from "@/components/UserTable";
import { useEffect, useRef, useState } from "react";

function arrayShuffle(userData: {number: number; name: string}[]): {number: number; name: string}[] {
  for(let i = (userData.length - 1); 0 < i; i--){
    // 0〜(i+1)の範囲で値を取得
    let r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    let tmp = userData[i];
    userData[i] = userData[r];
    userData[r] = tmp;
  }
  return userData;
}
function countTrueValues(matrix: boolean[][]) {
  let count = 0;

  // 行のループ
  for (let i = 0; i < matrix.length; i++) {
    // 行が undefined でないことを確認
    if (matrix[i] !== undefined) {
      // 列のループ
      for (let j = 0; j < matrix[i].length; j++) {
        // true の場合は count を増やす
        if (matrix[i][j] === true) {
          count++;
        }
      }
    }
  }
  return count;
}
export default function Home() {
  const [seatData, setSeatData] = useState<boolean[][]>([[true]]);
  const [userData, setUserData] = useState<{number: number; name: string}[]>([]); // [{number: 1, name: 'hoge'}
  const [shuffledUserData, setShuffledUserData] = useState<{number: number; name: string}[]>([]); // [{number: 1, name: 'hoge'}
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [seatCount, setSeatCount] = useState<number>(1);
  const [shuffledSeatData, setShuffledSeatData] = useState<{number: number | null; name: string}[][]>([[]]); // [{row: 1, column: 1, name: 'hoge'}
  const isShuffled = useRef<boolean>(false);

  const handleUploadUserCsv = (data: any): void => {
    const _formattedData = data.map((row: any) => {
      return {
        number: row[0],
        name: row[1]
      };
    }
    ).filter((row: any) => row.number !== '');
    console.log(_formattedData);
    setUserData(_formattedData);
  }
  const handleSetSeatData = (data: boolean[][]): void => {
    setSeatData(data);
    setSeatCount(countTrueValues(data));
  }
  const handleExecute = () => {
    // handle error
    console.log('実行ボタンが押されました');

    if (seatData.map(row => row.filter(value => value).length).reduce((a, b) => a + b, 0) !== userData.length) {
      // error
      setAlertMessage('座席数と対象者数が一致しません');
      return;
    }else{
      setAlertMessage('');
      if (!isShuffled.current) {
        // shuffle
        const _userData = arrayShuffle([...userData]);
        setShuffledUserData(_userData);
        console.log(_userData);
        console.log(seatData);
        isShuffled.current = true;
      }else{
        setAlertMessage('席替えは一度しか実行できません。');
      }
    }
  }
  useEffect(() => {
    setSeatCount(seatData.map(row => row.filter(value => value).length).reduce((a, b) => a + b, 0));
  }
  , [userData, seatData, handleSetSeatData]);
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
        <UserTable userData={userData} />
        <h2 className="text-2xl">配席のデータ</h2>
        <div className="flex mx-auto w-full">
          <SeatArrange handleSetSeatData={handleSetSeatData} seatData={seatData} />
        </div>
      </div>
      <div className="flex w-full py-4">
        <p className="mx-auto">現在の席数: {seatCount}席</p>
      </div>
      <div className="flex mx-auto w-full">
        <p className="mx-auto text-red-500">{alertMessage}</p>
      </div>
      <div className="w-full mx-auto flex">
        <button 
          onClick={handleExecute}
          className="green-blue-btn my-5 mx-auto disabled:opacity-50"
          disabled={!isShuffled}
          >
          席替えを実行
        </button>
      </div>
      {shuffledUserData.length !== 0 &&
        <div className="px-10">
          <SeatShuffle seatData={seatData} shuffledUserData={shuffledUserData} setShuffledSeatData={setShuffledSeatData} />
          <div className="flex">
            <CSVDownloader data={shuffledSeatData}/>
          </div>
        </div>}

    </>
  )
}
