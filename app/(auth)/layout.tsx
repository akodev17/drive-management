import Navbar from '@/components/shared/Navbar'
import Sidebar from '@/components/shared/Sidebar'
import { ChildProps } from '@/types'
import React from 'react'

const AuthLayout = ({children}: ChildProps) => {
  return (
    <div className='relative'>
      <div className="absolute inset-0 z-40 h-screen bg-black/50"></div>
        <Navbar/>
        <Sidebar/>
        <main className='w-full min-h-[90vh] relative top-[10vh] pl-72 bg-[#f6f9fc] dark:bg-[#1f1f1f]'>
        <div className='flex relative justify-center items-center z-50 w-full h-[90vh]'>{children}</div>
        </main>
    </div>
  )
}

export default AuthLayout