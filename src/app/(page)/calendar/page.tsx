'use client'

import CalendarPU from '@/app/(popup)/CalendarPU';
import ShowPU from '@/app/(popup)/ShowPU';
import UpdatePU from '@/app/(popup)/UpdatePU';
import Navbar from '@/app/components/Navbar';
import { getToday, MoneyFixing, setSession } from '@/app/lib/function';
import Link from 'next/link'
import React, { ReactNode, useEffect, useState } from 'react'
import { FaClock } from 'react-icons/fa';
import { TbGridPattern } from 'react-icons/tb';

const page = () => {
  
  interface DataItem {  
    id: number;  
    date: string;  
    data: TransactionData[];  
  }  
  
  interface TransactionData {  
    id: number;  
    icon: string;  
    category: string;  
    description: string;  
    time: string;  
    amount: number;  
    color: string;  // Assuming this is for a color class or identifier  
  } 

  const divs: JSX.Element[] = [];
  const [ datas, setDatas ] = useState<TransactionData[]>([])
  const [ showIsOpen, setShowIsOpen] = useState<boolean>(false)
  const [ updateIsOpen, setUpdateIsOpen] = useState<boolean>(false)
  const [ calendarIsOpen, setCalendarIsOpen] = useState<boolean>(false)

  const data = [  
    { id: 1, spent: 3000 },  
    { id: 2, spent: 5000 },  
    { id: 3, spent: 7000 },  
    { id: 4, spent: 10000 },  
    { id: 5, spent: 15000 },  
    { id: 6, spent: 22000 },  
    { id: 7, spent: 19000 },  
    { id: 8, spent: 11000 },  
    { id: 9, spent: 12000 },  
    { id: 10, spent: 14000 },  
    { id: 11, spent: 17000 },  
    { id: 12, spent: 30000 },  
    { id: 13, spent: 25000 },  
    { id: 14, spent: 8000 },  
    { id: 15, spent: 6000 },  
    { id: 16, spent: 2000 },  
    { id: 17, spent: 9000 },  
    { id: 18, spent: 35000 },  
    { id: 19, spent: 23000 },  
    { id: 20, spent: 3500 },  
    { id: 21, spent: 4500 },  
    { id: 22, spent: 5500 },  
    { id: 23, spent: 6500 },  
    { id: 24, spent: 7500 },  
    { id: 25, spent: 8500 },  
    { id: 26, spent: 9500 },  
    { id: 27, spent: 28000 },  
    { id: 28, spent: 31000 },  
    { id: 29, spent: 36000 },  
    { id: 30, spent: 33000 },  
  ]; 

  const dataHistory: DataItem[] = [
    {
      id: 1,
      date: "12/11/2024",
      data: [{
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
        icon: "🏠",
        category: "Home and Stuff",
        description: "Enjoy a variety of coffee and snacks in a relaxing atmosphere.",
        time: "11:00",
        amount: 25000,
        color: "hs"
      },
      {
        id: 3,
        icon: "🏥",
        category: "Health and Medicine",
        description: "Watch movies, play games, and unwind with friends.",
        time: "12:30",
        amount: 50000,
        color: "hm"
      },
      {
        id: 4,
        icon: "🛍️",
        category: "Shopping",
        description: "Discover the latest fashion and lifestyle products.",
        time: "14:00",
        amount: 75000,
        color: "sp"
      },
      {
        id: 5,
        icon: "💻",
        category: "Assignments",
        description: "Explore museums, galleries, and cultural events.",
        time: "15:30",
        amount: 60000,
        color: "as"
      }]
    },
    {
      id: 2,
      date: "01/01/2023",
      data: [{
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
        icon: "🏠",
        category: "Home and Stuff",
        description: "Enjoy a variety of coffee and snacks in a relaxing atmosphere.",
        time: "11:00",
        amount: 25000,
        color: "hs"
      },
      {
        id: 3,
        icon: "🏥",
        category: "Health and Medicine",
        description: "Watch movies, play games, and unwind with friends.",
        time: "12:30",
        amount: 50000,
        color: "hm"
      },
      {
        id: 4,
        icon: "🛍️",
        category: "Shopping",
        description: "Discover the latest fashion and lifestyle products.",
        time: "14:00",
        amount: 75000,
        color: "sp"
      },
      {
        id: 5,
        icon: "💻",
        category: "Assignments",
        description: "Explore museums, galleries, and cultural events.",
        time: "15:30",
        amount: 60000,
        color: "as"
      }]
    }
  ]

  const getFirstDay = () => {
    const today = new Date()
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
    return firstDay
  }  

  const LimitedText = ({ children, limit = 50 }: {children: ReactNode, limit?: number}) => {
    const text = children as string
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }

  const createCalendar = () => {
    if (getFirstDay() !== 0) {
      for (let i = 0; i < getFirstDay(); i++) {
        divs.push(<div key={i} className='aspect-square brdr border flex items-center justify-center text-4xl text-gray-400'><TbGridPattern /></div>)
      }
    }
    data.forEach((doc) => {
      const spent = doc.spent
      if (spent < 15000) {
        divs.push(<div onClick={() => openCalendar(doc.id + getFirstDay())} key={doc.id + getFirstDay()} className={'bg-ur aspect-square text-xs brdr border flex items-end justify-end p-1.5'}>{doc.id}</div>)
      } else if (spent >= 15000 && spent <= 30000) {
        divs.push(<div onClick={() => openCalendar(doc.id + getFirstDay())} key={doc.id + getFirstDay()} className={'bg-as aspect-square text-xs brdr border flex items-end justify-end p-1.5'}>{doc.id}</div>)
      } else if (spent == 0){
        divs.push(<div onClick={() => openCalendar(doc.id + getFirstDay())} key={doc.id + getFirstDay()} className={'bg-gray-400 aspect-square text-xs brdr border flex items-end justify-end p-1.5'}>{doc.id}</div>)
      } else{
        divs.push(<div onClick={() => openCalendar(doc.id + getFirstDay())} key={doc.id + getFirstDay()} className={'bg-hm aspect-square text-xs brdr border flex items-end justify-end p-1.5'}>{doc.id}</div>)
      }
    })

    if( divs.length % 7 !== 0 ) {
      for( let i = 0; i < divs.length % 7; i++ ){
        divs.push(<div key={i + 50} className='aspect-square brdr border flex items-center justify-center text-4xl text-gray-400 px-1'><TbGridPattern /></div>)
      }
    }
  }

  const openDetail = (id: string | number) => {
    console.log(id)
    setShowIsOpen(true) 
  }

  const openUpdate = (id: string | number) => {
    console.log(id)
    setUpdateIsOpen(true) 
  }

  const openCalendar = (id: string | number) => {
    console.log(id)
    setCalendarIsOpen(true) 
  }

  useEffect(() => {
    setSession()
  
    
    dataHistory.forEach((data) => {

      const month       = data.date.split("/")[1] + "/" + data.date.split("/")[2]
      const comparisson = getToday(true).split("/")[1] + "/" + getToday(true).split("/")[2]
      if(month == comparisson) {
        console.log(month, comparisson)
        setDatas(data.data)
      }
    })
  }, [])
  
  const userData = sessionStorage.getItem('user-data');
  const parsedData = userData ? JSON.parse(userData) : null;

  createCalendar()
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
          <h1 className='text-xl font-bold'>Calendar</h1>
        </nav>
        <main className='flex flex-col justify-center items-center mt-2 w-full'>
          <div className="mt-4 w-full">
            <div className="rounded-lg brdr items-stretch bg-as p-4 w-full flex flex-col mb-4">
              <h1 className='text-2xl font-medium'>
                <MoneyFixing format={true} rpext={true}>40000</MoneyFixing>
              </h1>
              <p>monthly total spent</p>
            </div>
            <div className="grid-cols-7 grid-rows-5 grid brdr border" id='calendar'>
              {divs}
            </div>
            <div className="grid grid-cols-7 my-4 text-xs">
              <p>Sun</p>
              <p>Mon</p>
              <p>Tue</p>
              <p>Wed</p>
              <p>Thu</p>
              <p>Fri</p>
              <p>Sat</p>
            </div>
            <hr />
            <div className="flex flex-col mt-4 rounded-lg brdr bg-as p-4 gap-2 text-xs">
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
            <div className="flex justify-end"> 
              <Link href={'/report'} className='underline w-full text-end mt-2'>settings aout the spending category</Link>
            </div>
          </div>
        </main>
        <div className="flex flex-col gap-2 mt-8">
          {datas.map(transaction => (
          <li key={transaction.id} className='w-full mb-4 flex justify-between items-end cursor-pointer'>
            <div onClick={() => {openDetail(transaction.id)}} className="flex gap-4 items-start">
              <div className={"aspect-square rounded-lg brdr p-2 flex justify-center items-center bg-" + transaction.color }>
                <p className="text-2xl">{transaction.icon}</p>
              </div>
              <div>
                <h1 className='text-base font-bold'>{transaction.category}</h1>
                <LimitedText>
                  {/* this is description */}
                  {transaction.description}
                </LimitedText>
                <div className='flex gap-1 mt-1 items-center'>
                  <FaClock className='-mt-1'/>
                  <p>{transaction.time}</p>
                </div>
              </div>
            </div>
            <div className='h-full flex flex-col justify-center items-end'>
              <div onClick={() => openUpdate(transaction.id)} className="cursor-pointer py-2 px-6 rounded-lg bg-ur brdr mb-1">edit</div>
              <h1 className='text-base font-bold whitespace-nowrap'><MoneyFixing>{transaction.amount}</MoneyFixing></h1>
            </div>
          </li>
          ))}
        </div>
      </div>
      { showIsOpen ? (
        <ShowPU onClick={setShowIsOpen}/>
      ) : ( null )}
      { updateIsOpen ? (
        <UpdatePU onClick={setUpdateIsOpen} date={getToday()}/>
      ) : ( null )}
      { calendarIsOpen ? (
        <CalendarPU onClick={setCalendarIsOpen}/>
      ) : ( null )}
      <Navbar></Navbar>
    </div>
  )
}

export default page