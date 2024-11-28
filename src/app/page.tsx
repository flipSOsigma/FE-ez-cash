import React from 'react'
import bg from '@/app/images/bg.png'
import Link from 'next/link'

const page = () => {
  return (
    <div className='w-full flex h-screen text-sm justify-center items-center text-black'>
      <div className="sm:max-w-md w-full p-8 bg-white min-h-screen flex flex-col" style={{backgroundImage: `url(${bg.src})`, backgroundRepeat: 'repeat', backgroundSize: 'cover'}}>
        <nav className="flex justify-end">
          <Link className='text-xl font-bold' href={'/'}>EZ Cash</Link>
        </nav>
        <main className='flex flex-1 flex-col justify-center items-center'>
          <h1 className='text-2xl font-bold mb-2'>Welcome to EZ Cash</h1>
          <p className='text-center max-w-sm'>can u please do the authentifications first before you continue</p>
        </main>
        <footer className="flex flex-col gap-2">
          <Link className='w-full text-center bg-sp py-2 brdr rounded-lg' href={'/signin'}>Sign in</Link>
          <Link className='w-full text-center bg-ot py-2 brdr rounded-lg' href={'/signup'}>Sign up</Link>
        </footer>
      </div>
    </div>
  )
}

export default page