'use client'

import BarChart from '@/app/components/BarChart'
import DoughnutChart from '@/app/components/DoughnutChart'
import React, { useEffect } from 'react'
import bg from '@/app/images/bg.png'
import { setSession } from '@/app/lib/function'

const page = () => {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  useEffect(() => {
    setSession()
  }, []);

  const userData = sessionStorage.getItem('user-data');
  const parsedData = userData ? JSON.parse(userData) : null;
  return (
    <div className='w-full flex text-sm min-h-screen items-center justify-center text-black'>
      <div className="sm:max-w-md w-full p-8 pb-40 bg-white min-h-screen flex flex-col" style={{backgroundImage: `url(${bg.src})`, backgroundRepeat: 'repeat', backgroundSize: 'cover'}}>
        <nav className="flex justify-start flex-col">
          <h1 className='text-xl font-bold'>Chart</h1>
          <p>allocation of money spent</p>
        </nav>
        <form className='flex items-stretch gap-2 mt-4  '>
          <select className="brdr w-full rounded-lg py-2 px-3 text-black" >
            {month.map ((month, ) => (
              <option key={month} value={month.toLowerCase()}>{month}</option>
            ))}
            <option value={'all'}>all time</option>
          </select>
          <button className='brdr text-center py-2 px-10 rounded-lg bg-sp'>find</button>
        </form>
        <div className="w-full flex justify-center">
            <DoughnutChart/>
        </div>
        <div className="flex flex-col mt-8 gap-4">
          <div className="flex items-center gap-2">
            <div className="bg-hm aspect-square p-2 brdr"></div>
            <b>20%</b>
            <p>Health and Medicine</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-as aspect-square p-2 brdr"></div>
            <b>20%</b>
            <p>Assignment</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-fb aspect-square p-2 brdr"></div>
            <b>20%</b>
            <p>Food and Beverages</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-tr aspect-square p-2 brdr"></div>
            <b>20%</b>
            <p>Transportation</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-tr aspect-square p-2 brdr"></div>
            <b>20%</b>
            <p>Shopping</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-tr aspect-square p-2 brdr"></div>
            <b>20%</b>
            <p>Home and Stuff</p>
          </div>
        </div>
        <div className='mt-8 p-4 bg-as brdr rounded-lg flex flex-col items-start'>
          <div>
            <h2 className='text-lg font-bold'>Bar Chart</h2>
            <p>compared weekly chart</p>
          </div>
          <BarChart/>
        </div>
      </div>
    </div>
  )
}

export default page