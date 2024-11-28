'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import { CgClose } from 'react-icons/cg'
import { today } from '../lib/function'

const UpdatePU = ( props: {date: string, uid: string, onClick: (value: boolean) => void}) => {
  const [ isAlert, setIsAlert ] = useState<string>("")

  const options: { label: string; value: string }[] = [  
    { label: "Health and Medicine", value: "health_and_medicine" },  
    { label: "Assignment", value: "assignment" },  
    { label: "Food and Beverages", value: "food_and_beverages" },  
    { label: "Transportation", value: "transportation" },  
    { label: "Shopping", value: "shopping" },  
    { label: "Home and Stuff", value: "home_and_stuff" },  
    { label: "Urgent", value: "urgent" },  
    { label: "Other", value: "other" }  
  ];  

  const LimitedText = ({ children, limit = 10 }: {children: ReactNode, limit?: number}) => {
    const text = children as string
    return text.length > limit ? `${text.substring(0, limit)}...` : text;
  }

  useEffect(() => {
    const form = document.querySelector('form');
    const getFormSetData = async () => {
      try {
        const response = await fetch('http://localhost:2000/transaction/uid/' + props.uid, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        const data = await response.json();
        if (data.status === "success") {
          return data.data;
        } else {
          console.error("Failed to fetch data:", data.message);
          return undefined;
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        return undefined;
      }
    };

    getFormSetData().then((data) => {
      if (data) {
        if (form) {
          const formData = {
            category: data.category,
            amount: data.amount.toString(),
            description: data.description,
          };
          Object.keys(formData).forEach((key) => {
            const input = form.querySelector(`[name="${key}"]`) as HTMLInputElement;
            if (input) {
              input.value = formData[key as keyof typeof formData];
            }
          });
        }
      }
    });
  }, []);

  const handleSubmit = (isReset: boolean, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    const form = e.currentTarget.closest('form')
    if(form) {
      const formData = new FormData(form)
      const data: {category: string, amount: string, description: string, date: string} = {
        category: formData.get("category") as string || "",
        amount: formData.get("amount") as string || "",
        description: formData.get("description") as string || "",
        date: today(), // change into now
      }
      if( !data.category || !data.amount || !data.description ) {
        setIsAlert("Please fill in all fields")
      } else {
        console.log(data);
        fetch('http://localhost:2000/transaction', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            category: data.category,
            amount: data.amount,
            description: data.description, 
            date: data.date,
          })
        }).then((res) => res.json()).then((response) => {
          if(response.status === "success") {
            // setIsLoading(false)
            setIsAlert("Data created successfully")
          } else {
            // setIsLoading(false)
            setIsAlert(response.message)
          }
        }).catch((error) => {
          console.error("Failed to create data:", error);
          // setIsLoading(false)
          setIsAlert("Failed to create data")
        });
      
        if(isReset) {
          const form = e.currentTarget.closest('form')
          form?.reset()
        } else {
          // props.onClick(false)
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
      <div className="sm:max-w-md w-full pt-8 min-h-screen gap-2 flex flex-col">
        <div className='flex justify-end w-full'>
          <CgClose onClick={closePopUp} className='text-2xl brdr rounded-lg bg-ot cursor-pointer box-content p-1'/>
        </div>
        <div className="bg-as rounded-lg brdr flex flex-col items-stretch w-full">
          <div className="p-4 w-full">
            <h1 className='text-xl font-bold'>Update Transaction</h1>
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
                <textarea name="description" id="description"cols={20} rows={10} className="px-3 brdr py-2 w-full rounded-lg text-black placeholder:text-black" placeholder="description">
                </textarea>
              </div>
            </div>
            <hr />
            <div className="flex gap-2 p-4 w-full">
              <button onClick={(e) => {handleSubmit(false, e)}} className="brdr py-2 w-full rounded-lg bg-sp">Save & Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default UpdatePU