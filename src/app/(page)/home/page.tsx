'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import CreatePU from '@/app/(popup)/CreatePU'
import { getToday, MoneyFixing, setSession } from '@/app/lib/function'
import History from '@/app/components/History'

const page = () => {
  
  const [ createIsOpen, setCreateIsOpen ] = useState<boolean>(false)

  useEffect(() => {
    setSession()
  }, [])
  
  const userData = sessionStorage.getItem('user-data');
  const parsedData = userData ? JSON.parse(userData) : null;
  const uid = parsedData?.uid as string

  return (
    <div className='w-full flex text-sm min-h-screen items-center justify-center text-black'>
      <div className="unused">
        <div className="bg-hm"></div>
        <div className="bg-as"></div>
        <div className="bg-fb"></div>
        <div className="bg-tr"></div>
        <div className="bg-sp"></div>
        <div className="bg-hs"></div>
        <div className="bg-ur"></div>
        <div className="bg-ot"></div>
      </div>
      <div className="sm:max-w-md w-full p-8 bg-white min-h-screen flex flex-col">
        <nav className="flex justify-start">
          <h1 className='text-xl font-bold'>Dashboard</h1>
        </nav>
        <main className='flex flex-col justify-center items-center mt-4 w-full'>
          <div className="rounded-lg brdr items-stretch bg-as p-4 w-full flex flex-col">
            <h1 className='text-2xl font-medium'>
              <MoneyFixing format={true} rpext={true}>40000</MoneyFixing>
              
            </h1>
            <p>weekly total spent</p>
            <p className="mt-16 text-end">
              <Link href={'/report'}>click to watch full report </Link>
            </p>
          </div>
          <div onClick={() => setCreateIsOpen(true)} className='w-full mt-2 bg-sp py-2 brdr rounded-lg text-center'>add transaction</div>
        </main>
        <div className="flex flex-col mt-12">
          <h1 className='text-xl font-bold'>Transaction History</h1>
          <p>transaction history this week</p>
        </div>
        <History uid={uid}/>
      </div>
      { createIsOpen ? (
        <CreatePU onClick={setCreateIsOpen} uid={uid} date={getToday()} />
      ) : ( null )}
    </div>
  )
}

export default page