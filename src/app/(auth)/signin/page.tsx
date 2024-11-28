'use client'

import React, { FormEvent, useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import bg from '@/app/images/bg.png'
import Link from 'next/link'
import { makeCookie, setSession } from '@/app/lib/function'
import { redirect } from 'next/navigation'
import LoadingPU from '@/app/(popup)/LoadingPU'

const page = () => {

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isError, setIsError] = useState<string>('')

  const openPass = (e: React.MouseEvent<HTMLDivElement>) => {
    const pass = document.getElementById('pass') as HTMLInputElement
    if (pass.type === 'password') {
      pass.type = 'text'
    } else {
      pass.type = 'password'
    }
  }

  const handlerSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    setIsLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)

    const email = formData.get('email') as string | null
    const password = formData.get('password') as string | null

    if (email && password) {
      const res = await fetch('http://localhost:2000/signin', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      })
      const response = await res.json() 

      if( response.status === "success" )  {
        const token = await response.token
        const cookie = makeCookie(token)
        
        console.log(cookie)
        setIsLoading(false)
        redirect('/home')
      }else{
        setIsLoading(false)
        if( response.message === "auth/missing-email" || response.message === "auth/invalid-email" ) {
          setIsError("email is not exist")
        } 
        else if( response.message === "auth/invalid-credential" ) {
          setIsError("password is incorrect")
        }
        else {
          setIsError(response.message)
        }
      }
    }else{
      setIsLoading(false)
      setIsError('email or password is empty')
    }
  }

  useEffect(() => {
    setSession()
  }, []);

  const userData = sessionStorage.getItem('user-data');
  const parsedData = userData ? JSON.parse(userData) : null;

  return (
    <div className='w-full flex text-sm h-screen justify-center items-center text-black'>
      <div className="sm:max-w-md w-full p-8 bg-white justify-between min-h-screen flex flex-col" style={{backgroundImage: `url(${bg.src})`, backgroundRepeat: 'repeat', backgroundSize: 'cover'}}>
        <nav className="flex justify-end">
          <Link className='text-xl font-bold' href={'/'}>EZ Cash</Link>
        </nav>
        <form onSubmit={(e) => {handlerSubmit(e)}} method='post' className='flex flex-col justify-center items-stretch p-4 rounded-t-xl bg-as brdr -mb-8'>
          <h1 className='text-xl font-bold'>Welcome back user</h1>
          <p className='text-start max-w-sm'>hello, nice to see you again</p>
          { isError ? ( 
              <div className="w-full text-center brdr rounded-lg mt-4 py-2 bg-hm">
                { isError }
              </div>
            ) : (null) }
          <input type="email" name='email' className="px-3 brdr bg-white mt-4 mb-2 py-2 rounded-lg text-black placeholder:text-black" placeholder="email" />
          <div className="flex gap-2 items-center">
            <input id='pass' name='password' type="password" className="px-3 brdr w-full bg-white py-2 rounded-lg text-black placeholder:text-black" placeholder="password" />
            <div onClick={(e) => {openPass(e)}} className="rounded-lg p-3 aspect-square brdr flex justify-center items-center bg-ot cursor-pointer">
              <FaEye />
            </div>
          </div>
          <p className="text-sm my-4 text-center w-full">dont have an account? <Link href={'/signup'} className='underline font-bold'>sign up here</Link></p>
          <button className="brdr py-2 rounded-lg bg-sp">
            sign in
          </button>
        </form>
      </div>
      { isLoading ? <LoadingPU/> : null }
    </div>
  )
}

export default page