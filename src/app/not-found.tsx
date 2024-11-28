import Link from 'next/link'
import bg from '@/app/images/bg.png'
import { BsEmojiSmileUpsideDown } from 'react-icons/bs'
 
export default function NotFound() {
  return (
    <div className='w-full flex text-sm min-h-screen items-center justify-center text-black' >
      <div className="sm:max-w-md w-full items-center  p-8 bg-white min-h-screen flex flex-col" style={{backgroundImage: `url(${bg.src})`, backgroundRepeat: 'repeat', backgroundSize: 'cover'}}>
        <main className='flex flex-1 flex-col justify-center items-center'>
          <BsEmojiSmileUpsideDown className='text-6xl mb-8'/>
          <h1 className='text-4xl font-bold mb-2'>404</h1>
          <p className='text-center max-w-sm'>your page request is not found</p>
        </main>
      </div>
    </div>
  )
}