'use client'

import React, { ReactNode, useState } from 'react'
import { CgClose } from 'react-icons/cg'


const CreatePU = ( props:{date: string, uid: string , onClick: (value: boolean) => void}) => {
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ isAlert, setIsAlert ] = useState<string>("")

  const options: { label: string; value: string }[] = [  
    { label: "Health and Medicine", value: "Health and Medicine" },  
    { label: "Assignment", value: "Assignment" },  
    { label: "Food and Beverages", value: "Food and Beverages" },  
    { label: "Transportation", value: "Transportation" },  
    { label: "Shopping", value: "Shopping" },  
    { label: "Home and Stuff", value: "Home and Stuff" },  
    { label: "Urgent", value: "Urgent" },  
    { label: "Other", value: "Other" }  
  ];  

  const LimitedText = ({ children, limit = 10 }: {children: ReactNode, limit?: number}) => {
    const text = children as string
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }

  const handleSubmit = async (isReset: boolean, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const form = e.currentTarget.closest('form')
    if(form) {
      const formData = new FormData(form)
      const data: {uid: string, category: string, amount: string, description: string, date: string} = {
        uid: props.uid as string,
        amount: formData.get("amount") as string || "",
        description: formData.get("description") as string || "",
        category: formData.get("category") as string || "",
        date: formData.get("date") as string || "",
      }

      if( !data.category || !data.amount || !data.description || !data.date ) {
        setIsAlert("Please fill in all fields")
      } else {
        console.log(data)
        setIsLoading(true)
        const res = await fetch('http://localhost:2000/transaction', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        const response = await res.json()
        if(response.status === "success") {
          setIsLoading(false)
          if(isReset) {
            const form = e.currentTarget.closest('form')
            form?.reset()
          } else {
            props.onClick(false)
          }
        }else{
          setIsLoading(false)
          setIsAlert(response.message)
        }
      }
    }
  }

  const closePopUp = () => {  
    setIsAlert("")
    props.onClick(false);  
  }

  return (
    <div className='w-full left-0 flex-col top-0 flex text-sm h-screen justify-center p-8 items-center text-black fixed z-40 bg-black/80'>
      <div className="sm:max-w-md w-full p-8 min-h-screen gap-2 flex flex-col">
        <div className='flex justify-end w-full'>
          <CgClose onClick={closePopUp} className='text-2xl brdr rounded-lg bg-ot cursor-pointer box-content p-1'/>
        </div>
        <div className="bg-as rounded-lg brdr flex flex-col items-stretch w-full">
          <div className="p-4 w-full">
            <h1 className='text-xl font-bold'>Create Transaction</h1>
            <p className='lowercase'>{props.date}</p>
          </div>
          <hr />
          <form method='post' className="w-full flex flex-col gap-4">
            <div className='flex flex-col p-4 gap-4'>
              { isAlert == "" ? (
                null
              ) : (
                <div className="brdr rounded-lg bg-hm w-full text-center py-2"> {isAlert} </div>
              )}
              <div className="flex gap-2">
                <select name='category' className="px-3 brdr py-2 rounded-lg bg-sp text-black placeholder:text-black">
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      <LimitedText>{option.label}</LimitedText>
                    </option>
                  ))}
                </select>
                <input type="number" name='amount' className="px-3 brdr py-2 w-full rounded-lg text-black placeholder:text-black" placeholder="transaction amount" />
              </div>
              <div className="flex flex-col">
                <label htmlFor="description">Description</label>
                <textarea name="description" id="description" cols={1} rows={10} className="h-20 px-3 brdr py-2 w-full rounded-lg text-black placeholder:text-black" placeholder="description">
                </textarea>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="date">Date time</label>
                <input name='date' id='date' type="datetime-local" className="px-3 brdr py-2 w-full rounded-lg text-black placeholder:text-black" />
              </div>
            </div>
            <hr />
            <div className="flex gap-2 p-4 w-full">
              {/* <button onClick={(e) => {handleSubmit(true, e)}} className="brdr py-2 w-full rounded-lg bg-ur">Save & Clear</button> */}
              <button onClick={(e) => {handleSubmit(false, e)}} className="brdr py-2 w-full rounded-lg bg-sp">Save & Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreatePU