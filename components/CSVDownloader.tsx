import React from 'react'

interface Props {
  data: {number: number | null; name: string}[][]
}

export default function CSVDownloader({data}: Props) {

  const handleDownloadCsv = () => {
    const header = data[0].map((_, index) => {
      return `${index + 1}列`;
    }).join(',') + "\n";

    const csvData = data.map((row) => {
      return row.map((column) => {
        return `${column.number}-${column.name}`;
      }).join(',');
    }).join('\n');
    const bom = new Uint8Array([0xEF, 0xBB, 0xBF]);
    const blob = new Blob([bom, header, csvData], {type: 'text/csv;charset=utf-8;'});
    const url = (window.URL || window.webkitURL).createObjectURL(blob);
    const download = document.createElement('a');
    download.href = url;
    download.download = 'seat.csv';
    download.click();
    download.remove();
  }
  return (
    <div className='mx-auto'>
      <button 
      className="teal-lime-btn mx-auto "
      onClick={handleDownloadCsv}
      >
        CSV形式でダウンロード
      </button>
    </div>
    
  )
}
