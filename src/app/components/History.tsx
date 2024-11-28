import React, { useEffect, useState } from 'react'
import { DateFixing, getToday, LimitedText, MoneyFixing } from '../lib/function';
import { FaClock } from 'react-icons/fa';
import ShowPU from '../(popup)/ShowPU';
import UpdatePU from '../(popup)/UpdatePU';

const History = ( { uid }: {uid?: string}) => {
  interface DataItem {  
    id: number;  
    date: string;  
    data: TransactionData[];  
  }  
  
  interface TransactionData {  
    id: string;  
    icon: string;  
    category: string;  
    description: string;  
    time: string;  
    amount: number;  
    color: string;  
  } 
  const [ datas, setDatas ] = useState<DataItem[]>([])
  const [ showIsOpen, setShowIsOpen] = useState<boolean>(false)
  const [ updateIsOpen, setUpdateIsOpen] = useState<boolean>(false)
  const [ Uid, setUid ] = useState<string>("")

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('http://localhost:2000/transaction/' + uid, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      const response = await res.json()
      console.log(response.data)
      setDatas(response.data)
    }

    getData()
  }, [])

  const openDetail = async (id: string) => {
    setUid(id)
    setShowIsOpen(true) 
  }

  const openUpdate = (id: string ) => {
    setUid(id)
    setUpdateIsOpen(true) 
  }
  return (
    <div>
      {datas?.map((data) => (
      <div key={data.id} className="flex flex-col mt-4">
        <p><DateFixing>{data.date}</DateFixing></p>
        <ul className='flex flex-col mt-4 w-full'>
          {/* list of transaction */}
          {data.data.map(transaction => (
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
        </ul>
      </div>
      ))}
      
      { showIsOpen ? (
        <ShowPU uid={Uid} onClick={setShowIsOpen}/>
      ) : ( null )}
      { updateIsOpen ? (
        <UpdatePU onClick={setUpdateIsOpen} uid={Uid} date={getToday()}/>
      ) : ( null )}
    </div>
  )
}

export default History