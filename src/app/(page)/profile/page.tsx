'use client'

import { MoneyFixing, setSession } from '@/app/lib/function'
import React, { MouseEvent, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { redirect, useRouter } from 'next/navigation'
import LoadingPU from '@/app/(popup)/LoadingPU'

const page = () => {
  const signOutHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsLoading(true)
    Cookies.remove('token')
    sessionStorage.removeItem('user-data')
    redirect('/signin')
  }

  useEffect(() => {
    setSession()
  }, []);

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const userData = sessionStorage.getItem('user-data');
  const parsedData = userData ? JSON.parse(userData) : null;
  
  return (
    <div className='w-full flex text-sm min-h-screen items-center justify-center text-black' >
      <div className="sm:max-w-md w-full p-8 bg-white min-h-screen flex flex-col">
        <nav className="flex justify-start">
          <h1 className='text-xl font-bold'>Profile </h1>
        </nav>
        <main className='flex flex-col justify-center items-center mt-4'>
          <div className="w-32 aspect-square brdr rounded-full">
            <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1600" alt="" className='w-full aspect-square object-cover object-center rounded-full '/>
          </div>
          <h1 className='text-2xl font-bold mt- 8'>Alif Mahendra</h1>
          <p>alif.mhndr@gmail.com</p>
          <div className="flex jsutify-center gap-2 mt-4">
            <button onClick={signOutHandler} className='brdr py-2 px-4 rounded-lg flex-1 w-full whitespace-nowrap text-center bg-hm'>sign out</button>
            <button className='brdr py-2 px-4 rounded-lg flex-1 w-full whitespace-nowrap text-center bg-ur'>edit profile</button>
          </div>
        </main>
        <div className="flex flex-col mt-8 rounded-lg brdr bg-as p-4 gap-2 text-xs">
          <div className="flex items-center gap-2 ">
            <div className="bg-hm aspect-square p-2 brdr"></div>
            <p>Over Spending ~ More than<MoneyFixing rpext={false} format={false}>100000</MoneyFixing></p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-as aspect-square p-2 brdr"></div>
            <p>Normal Spending ~ Around(<MoneyFixing rpext={false} format={false}>100000</MoneyFixing> -<MoneyFixing rpext={false} format={false}>100000</MoneyFixing>)</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-ur aspect-square p-2 brdr"></div>
            <p>Good Spending ~ More than<MoneyFixing rpext={false} format={false}>100000</MoneyFixing></p>
          </div>
        </div>
        <form className="mt-2 flex justify-between gap-4 items-center">
          <p className='whitespace-nowrap'>Normal Spending</p>
          <div className="flex items-center gap-2">
            <input placeholder='lowest' name='lowest' type="text" className='brdr bg-ur w-full rounded-lg py-2 px-3 text-black placeholder:text-black' />
            <input placeholder='highest' name='highest' type="text" className='brdr bg-hm w-full rounded-lg py-2 px-3 text-black placeholder:text-black' />
          </div>
        </form>
      </div>
      { isLoading ? <LoadingPU/> : null }
    </div>
  )
}

export default page