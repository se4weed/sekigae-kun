"use client"
import CSVDownloader from "@/components/CSVDownloader";
import CSVReader from "@/components/CSVReader";
import SeatShuffle from "@/components/SeatShuffle";
import UserTable from "@/components/UserTable";
import { useEffect, useRef, useState } from "react";
import { arrayShuffle, countTrueValues } from "@/utils/sekigae";
import SeatArrange from "@/components/SeatArrange";

export const Sekigae = () => {
  const [seatData, setSeatData] = useState<boolean[][]>([[true]]);
  const [userData, setUserData] = useState<{number: number; name: string}[]>([]);
  const [shuffledUserData, setShuffledUserData] = useState<{number: number; name: string}[]>([]);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [seatCount, setSeatCount] = useState<number>(1);
  const [shuffledSeatData, setShuffledSeatData] = useState<{number: number | null; name: string}[][]>([[]]);
  const isShuffled = useRef<boolean>(false);

  const handleUploadUserCsv = (data: any): void => {
    const _formattedData = data.map((row: any) => {
      return {
        number: row[0],
        name: row[1]
      };
    }
    ).filter((row: any) => row.number !== '');
    setUserData(_formattedData);
  }
  const handleSetSeatData = (data: boolean[][]): void => {
    setSeatData(data);
    setSeatCount(countTrueValues(data));
  }
  const handleExecute = () => {
    if (seatData.map(row => row.filter(value => value).length).reduce((a, b) => a + b, 0) !== userData.length) {
      setAlertMessage('座席数と対象者数が一致しません');
      return;
    }else{
      setAlertMessage('');
      if (!isShuffled.current) {
        // shuffle
        const _userData = arrayShuffle([...userData]);
        setShuffledUserData(_userData);
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
      {shuffledUserData.length !== 0 && <div className="px-10">
        <SeatShuffle seatData={seatData} shuffledUserData={shuffledUserData} setShuffledSeatData={setShuffledSeatData} />
        <div className="flex">
          <CSVDownloader data={shuffledSeatData}/>
        </div>
      </div>}
    </>
  )
}
