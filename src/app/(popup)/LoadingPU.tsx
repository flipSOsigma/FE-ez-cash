import React from 'react'

const LoadingPU = () => {
  return (
    <div className='w-full left-0 flex-col top-0 flex text-sm h-screen justify-center p-8 items-center text-black fixed z-40 bg-black/80'>
      <div className="sm:max-w-md w-full pt-8 min-h-screen gap-2 flex flex-col justify-center">
        <div className='flex justify-center items-center gap-4 w-full'>
          <div className="rounded-full brdr bg-sp w-10 animate-bounce duration-300 aspect-square"></div>
          <div className="rounded-full brdr bg-hm w-10 animate-bounce duration-300 delay-150 aspect-square"></div>
          <div className="rounded-full brdr bg-ur w-10 animate-bounce duration-300 delay-200 aspect-square"></div>
        </div>
      </div>
    </div>
  )
}

export default LoadingPU