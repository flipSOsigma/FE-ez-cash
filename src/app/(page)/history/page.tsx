'use client';

import History from '@/app/components/History'
import { setSession } from '@/app/lib/function';
import React, { useEffect } from 'react'

const page = () => {
  useEffect(() => {
    setSession()
  }, []);

  const userData = sessionStorage.getItem('user-data');
  const parsedData = userData ? JSON.parse(userData) : null;
  return (
    <div className='w-full flex text-sm min-h-screen items-center justify-center text-black'>
      <div className="sm:max-w-md w-full p-8 pb-40 bg-white min-h-screen flex flex-col" >
        <nav className="flex justify-start flex-col">
          <h1 className='text-xl font-bold'>History</h1>
          <p>transaction history</p>
        </nav>
        <form className='flex items-stretch gap-2 mt-4  '>
          <input type="date" name="date" id="date" className='brdr w-full rounded-lg py-2 px-3 text-black' />
          <button className='brdr text-center py-2 px-10 rounded-lg bg-sp'>find</button>
        </form>
        <History/>
      </div>
    </div>
  )
}

export default page