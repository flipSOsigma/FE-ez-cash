'use client'

import React, { ReactNode, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { FaClock } from 'react-icons/fa'
import UpdatePU from './UpdatePU'
import { getToday } from '../lib/function'

const ShowPU = (props: {uid: string, onClick: (value: boolean) => void}) => {

  const [ updateIsOpen, setUpdateIsOpen] = useState<boolean>(false)

  const transaction = {
    id: "1",
    icon: "🍔",
    category: "Food and Beverages",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora, obcaecati.",
    time: "10:00",
    amount: 40000,
    color: "fb"
  }

  const MoneyFixing = ({ children }: { children: ReactNode}) => {
    const amount = children as number
    const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount);
    return formatted.replace('Rp', 'IDR')
  }

  const closePopUp = () => {  
    props.onClick(false);  
  }

  const openUpdate = (id: string ) => {
    console.log(id)
    setUpdateIsOpen(true)
  }

  const deleteHandle = async () => {
    console.log(props.uid)
    const res = await fetch('http://localhost:2000/transaction/' + props.uid, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      }
    }) 
    const response = await res.json()
    console.log(response)
  }

  return (
    <div className='w-full left-0 flex-col top-0 flex text-sm h-screen justify-center p-8 items-center text-black fixed z-40 bg-black/80'>
      <div className="sm:max-w-md w-full p-8 min-h-screen gap-2 flex flex-col">
        <div className='flex justify-end w-full'>
          <CgClose onClick={closePopUp} className='text-2xl brdr rounded-lg bg-ot cursor-pointer box-content p-1'/>
        </div>
        <div className="brdr bg-sp p-4 rounded-lg flex flex-col">
        <div className="flex gap-2 items-start">
          <div className={"aspect-square rounded-lg brdr p-2 flex justify-center items-center bg-" + transaction.color }>
            <p className="text-3xl">{transaction.icon}</p>
          </div>
          <div>
            <h1 className='text-base font-bold'>{transaction.category}</h1>
              {transaction.description}
              <div className='flex gap-1 mt-1 items-center'>
                <FaClock className='-mt-1'/>
                <p>{transaction.time}</p>
              </div>
            </div>
          </div>
          <div className='h-full flex flex-col justify-center items-end'>
            <h1 className='text-base font-bold whitespace-nowrap'><MoneyFixing>{transaction.amount}</MoneyFixing></h1>
          </div>
        </div>
        <div className='flex w-full gap-2'>
          <button className="brdr py-2 w-full rounded-lg bg-hm" onClick={deleteHandle}>Delete</button>
          <button className="brdr py-2 w-full rounded-lg bg-ur" onClick={() => openUpdate(transaction.id)}>Edit</button>
        </div>
      </div>
      { updateIsOpen ? (
        <UpdatePU onClick={setUpdateIsOpen} uid={props.uid} date={getToday()}/>
      ) : ( null )}
    </div>
  )
}

export default ShowPU