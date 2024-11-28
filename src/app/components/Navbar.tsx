import Link from 'next/link'
import React from 'react'
import { FaCalendar, FaClock, FaHome, FaUserCircle } from 'react-icons/fa'
import { MdOutlineBarChart } from 'react-icons/md'

const Navbar = () => {
  return (
    <div className='w-full flex justify-center fixed bottom-0 z-40 '>
      <div className="sm:max-w-md text-black w-full p-8 flex flex-col  rounded-lg">
        <div className="pb-2 pt-1 px-4 rounded-lg brdr bg-sp flex justify-around items-center">
          <Link href={'/calendar'} className="flex flex-col items-center text-xs gap-2 group flex-1">
            <FaCalendar className='text-xl translate-y-4 group-hover:translate-y-0 duration-300' />
            <p className='duration-300 group-hover:opacity-100 opacity-0'>calendar</p>
          </Link>
          <Link href={'/history'} className="flex flex-col items-center text-xs gap-2 group flex-1">
            <FaClock className='text-xl translate-y-4 group-hover:translate-y-0 duration-300' />
            <p className='duration-300 group-hover:opacity-100 opacity-0'>history</p>
          </Link>
          <Link href={'/home'} className="flex flex-col items-center text-xs gap-2 group flex-1">
            <FaHome className='text-xl translate-y-4 group-hover:translate-y-0 duration-300' />
            <p className='duration-300 group-hover:opacity-100 opacity-0'>home</p>
          </Link>
          <Link href={'/chart'} className="flex flex-col items-center text-xs gap-2 group flex-1">
            <MdOutlineBarChart className='text-xl translate-y-4 group-hover:translate-y-0 duration-300' />
            <p className='duration-300 group-hover:opacity-100 opacity-0'>chart</p>
          </Link>
          <Link href={'/profile'} className="flex flex-col items-center text-xs gap-2 group flex-1">
            <FaUserCircle className='text-xl translate-y-4 group-hover:translate-y-0 duration-300' />
            <p className='duration-300 group-hover:opacity-100 opacity-0'>profile</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar