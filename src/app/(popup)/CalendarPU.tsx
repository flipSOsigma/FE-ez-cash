'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaClock } from 'react-icons/fa'
import { LimitedText } from '../lib/function'

const CalendarPU = (props: {onClick: (value: boolean) => void}) => {

  const data = [{
    id: 1,
    icon: "🍔",
    category: "Food and Beverages",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, obcaecati.",
    time: "10:00",
    amount: 40000,
    color: "fb"
  },
  {
    id: 2,
    icon: "🍔",
    category: "Food and Beverages",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, obcaecati.",
    time: "10:00",
    amount: 40000,
    color: "fb"
  },
  {
    id: 3,
    icon: "🍔",
    category: "Food and Beverages",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, obcaecati.",
    time: "10:00",
    amount: 40000,
    color: "fb"
  }]

  const MoneyFixing = ({ children }: { children: ReactNode}) => {
    const amount = children as number
    const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    return formatted.replace('Rp', 'IDR')
  }

  const closePopUp = () => {  
    props.onClick(false);  
  }

  return (
    <div className='w-full left-0 flex-col top-0 flex text-sm h-screen justify-center p-8 items-center text-black fixed z-40 bg-black/80'>
      <div className="sm:max-w-md w-full pt-8 min-h-screen gap-2 flex flex-col">
        <div className='flex justify-end w-full'>
          <CgClose onClick={closePopUp} className='text-2xl brdr rounded-lg bg-ot cursor-pointer box-content p-1'/>
        </div>
        <div className="brdr bg-sp p-4 rounded-lg flex flex-col gap-4">
          { data.map((doc) => (
            <div key={doc.id} className="flex gap-2 items-start">
              <div className={"aspect-square rounded-lg brdr p-2 flex justify-center items-center bg-" + doc.color }>
                <p className="text-3xl">{doc.icon}</p>
              </div>
              <div>
                <h1 className='text-base font-bold'>{doc.category}</h1>
                <LimitedText>{doc.description}</LimitedText>
                <div className='flex gap-1 mt-1 items-center'>
                  <FaClock className='-mt-1'/>
                  <p>{doc.time}</p>
                </div>
              </div>
              <div className='h-full flex flex-col justify-center items-end'>
                <h1 className='text-base font-bold whitespace-nowrap'><MoneyFixing>{doc.amount}</MoneyFixing></h1>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default CalendarPU