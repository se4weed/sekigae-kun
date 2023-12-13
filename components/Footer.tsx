import React from 'react'
import GithubIcon from "@/public/github.svg";
import Link from 'next/link';

export const Footer = () => {
  return (
    <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
      <p className="leading-normal my-5">NIT, Nara College
      </p>
      <span className="inline-flex">
        <Link href="https://github.com/ynori123/sekigae-kun" target='_blank' className="text-gray-500">
          <GithubIcon className='w-10 h-10 opacity-80 hover:opacity-100' />
        </Link>
      </span>
    </div>
  )
}
